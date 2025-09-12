import "server-only";
import { createClient } from "@/api/client";

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
