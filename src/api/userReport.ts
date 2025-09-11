import "server-only";
import { createClient } from "@/api/client";

type Status = "pending" | "ignored" | "banned";
type Sort = "latest" | "oldest" | "most";
interface Options {
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
}: Options) {
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_user_reports", {
    status: status && status.length > 0 ? status : null, // status 값이 없다면 null 전달(= 필터 없음)
    sort,
    page,
    pageSize,
  });

  return { data: data.data, total: data.count };
}
