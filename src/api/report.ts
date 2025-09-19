import "server-only";
import { createClient } from "@/api/client";
import { asArray } from "@/utils/array";

type Content = "post" | "comment";
type Status = "pending" | "ignored" | "banned";
type Sort = "latest" | "oldest" | "most";

interface UserReportOptions {
  status?: Status[];
  sort: Sort;
  page: number;
  pageSize: number;
}

// 사용자 신고 조회
export async function getUserReports({
  status,
  sort,
  page,
  pageSize,
}: UserReportOptions) {
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_user_reports", {
    status: status && status.length > 0 ? status : null, // status 값이 없다면 null 전달(= 필터 없음)
    sort,
    page,
    pageSize,
  });

  return { data: data.data, total: data.count };
}

interface ContentReportOptions {
  content?: Content[];
  status?: Status[];
  sort: Sort;
  page: number;
  pageSize: number;
}

// 게시글/댓글 신고 조회
export async function getContentReports({
  content,
  status,
  sort,
  page,
  pageSize,
}: ContentReportOptions) {
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_content_reports", {
    content: content && content.length > 0 ? content : null, // content 값이 없다면 null 전달(= 필터 없음)
    status: status && status.length > 0 ? status : null, // status 값이 없다면 null 전달(= 필터 없음)
    sort,
    page,
    pageSize,
  });

  return { data: data.data, total: data.count };
}

interface ReportOptions {
  userId?: string;
  postId?: number;
  commentId?: number;
}
interface Report {
  id: string;
  createdAt: string;
  reportType:
    | "Inappropriate"
    | "Conflict"
    | "Violence"
    | "Ads"
    | "Spam"
    | "Other";
  reportContent: string;
  user: {
    id: string;
    email: string;
  };
}

// 미확인 신고 조회
export async function getReportById({
  userId,
  postId,
  commentId,
}: ReportOptions) {
  const supabase = await createClient();

  let query = supabase
    .from("report")
    .select(
      `
      id,
      createdAt,
      reportType,
      reportContent,
      user:reportedId ( id, username, email )
    `,
    )
    .is("checked", false);

  query = postId ? query.eq("postId", postId) : query.is("postId", null);
  query = commentId
    ? query.eq("commentId", commentId)
    : query.is("commentId", null);
  query = userId ? query.eq("reportedId", userId) : query;

  const { data } = await query.order("createdAt", { ascending: true });

  return { data: data as unknown as Report[] };
}

interface LogOptions {
  userId?: string;
  postId?: number;
  commentId?: number;
}
interface ReportLog {
  id: string;
  createdAt: string;
  occuredAt: string;
  type: "memo" | "ignore" | "ban";
  memo: string;
  reports: Report[];
  user: { name: string; userId: string };
}

// 신고 로그 조회
export async function getReportLogsById({
  userId,
  postId,
  commentId,
}: LogOptions) {
  const supabase = await createClient();

  let query = supabase.from("reportLog").select(
    `
      id,
      createdAt,
      occuredAt,
      type,
      memo,
      user:adminId (userId, name),
      reports:reportLogReports (
        report:reportId (
          id,
          createdAt,
          reportType,
          reportContent,
          user:reporterId ( id, email )
        )
      )
    `,
  );

  query = postId ? query.eq("postId", postId) : query.is("postId", null);
  query = commentId
    ? query.eq("commentId", commentId)
    : query.is("commentId", null);
  query = userId ? query.eq("userId", userId) : query.is("userId", null);

  const { data } = await query.order("occuredAt", { ascending: true });

  // 평탄화
  const normalized = (data ?? []).map((log) => ({
    ...log,
    reports: asArray(log.reports).map((r: any) => r.report),
  }));

  return { data: normalized as unknown as ReportLog[] };
}
