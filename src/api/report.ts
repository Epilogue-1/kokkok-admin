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
      user:reporterId ( id, username, email )
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

type ReportWithOnlyId = Pick<Report, "id">;

// 신고 확인 처리
export async function checkReports(reports: ReportWithOnlyId[]) {
  const supabase = await createClient();

  const ids = reports.map((report) => report.id);

  const { error: updateError } = await supabase
    .from("report")
    .update({ checked: true })
    .in("id", ids);

  if (updateError) {
    throw updateError;
  }
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

interface MemoOptions {
  userId?: string;
  postId?: number;
  commentId?: number;
  memo: string;
}

// 신고 메모 로그 추가
export async function addReportMemoLog({
  userId,
  postId,
  commentId,
  memo,
}: MemoOptions) {
  const supabase = await createClient();

  // 관리자 정보 조회
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("관리자 정보를 확인할 수 없습니다.");
  }

  // 신고 메모에 대한 로그 추가
  const { error: insertError } = await supabase.from("reportLog").insert({
    userId,
    postId,
    commentId,
    adminId: user.id,
    type: "memo",
    memo,
  });

  if (insertError) {
    throw insertError;
  }
}

interface IgnoreOptions {
  userId?: string;
  postId?: number;
  commentId?: number;
  memo?: string;
  reports: { id: string; createdAt: string }[];
}

// 신고 기각 로그 추가
export async function addReportIgnoreLog({
  userId,
  postId,
  commentId,
  memo,
  reports,
}: IgnoreOptions) {
  const supabase = await createClient();

  // 관리자 정보 조회
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("관리자 정보를 확인할 수 없습니다.");
  }

  // 기각된 신고들 중 가장 오래된 createdAt 찾기
  const firstReportedAt = reports.reduce((earliestCreatedAt, report) => {
    const current = new Date(report.createdAt);
    const earliest = new Date(earliestCreatedAt);
    return current < earliest ? report.createdAt : earliestCreatedAt;
  }, reports[0]?.createdAt ?? "");

  // reportLog에 신고 기각 로그 추가 (기각된 신고 확인용)
  const { data: reportLogData, error: insertReportsError } = await supabase
    .from("reportLog")
    .insert({
      userId,
      postId,
      commentId,
      adminId: user.id,
      type: "ignore",
      occuredAt: firstReportedAt,
    })
    .select()
    .single();

  if (insertReportsError) {
    throw insertReportsError;
  }

  // reportLogReports에 여러 행 추가
  const rowsToInsert = reports.map((report) => ({
    logId: reportLogData.id,
    reportId: report.id,
  }));

  const { error: insertLogReportsError } = await supabase
    .from("reportLogReports")
    .insert(rowsToInsert);

  if (insertLogReportsError) {
    throw insertLogReportsError;
  }

  // reportLog에 신고 기각 로그 추가
  const { error: insertIgnoreError } = await supabase.from("reportLog").insert({
    userId,
    postId,
    commentId,
    adminId: user.id,
    type: "ignore",
    memo,
  });

  if (insertIgnoreError) {
    throw insertIgnoreError;
  }
}

interface BanOptions {
  userId?: string;
  postId?: number;
  commentId?: number;
  memo?: string;
}

// 신고 제한 로그 추가
export async function addReportBanLog({
  userId,
  postId,
  commentId,
  memo,
}: BanOptions) {
  const supabase = await createClient();

  // 관리자 정보 조회
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("관리자 정보를 확인할 수 없습니다.");
  }

  // reportLog에 신고 제한 로그 추가
  const { error: insertError } = await supabase.from("reportLog").insert({
    userId,
    postId,
    commentId,
    adminId: user.id,
    type: "ban",
    memo,
  });

  if (insertError) {
    throw insertError;
  }
}
