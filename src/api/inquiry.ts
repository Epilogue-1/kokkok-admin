import "server-only";
import { createClient } from "@/api/client";

type Type = "bug_report" | "account" | "feature_request" | "other";
type Status = "pending" | "ignored" | "processing" | "resolved";
type Sort = "latest" | "oldest";
interface Options {
  type?: Type[];
  status?: Status[];
  sort: Sort;
  page: number;
  pageSize: number;
}
interface Inquiry {
  id: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  userId: string;
  type: Type;
  content: string;
  email: string | null;
  status: Status;
}

// 문의 전체 조회
export async function getInquiries({
  type,
  status,
  sort,
  page,
  pageSize,
}: Options) {
  const supabase = await createClient();

  let query = supabase.from("inquiry").select("*", { count: "exact" });

  // filtering: 파라미터로 받은 type & status에 해당하는 행만 가져오기
  if (type && type.length > 0) {
    query = query.in("type", type);
  }
  if (status && status.length > 0) {
    query = query.in("status", status);
  }

  // sorting: 최신순 or 오래된순 정렬하기
  query = query.order("createdAt", { ascending: sort === "oldest" });

  // paging: from부터 to까지의 행 가져오기
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count } = await query;

  return { data: data || [], total: count || 0 };
}

// id로 문의 조회
export async function getInquiryById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("inquiry")
    .select(
      `
      id,
      createdAt,
      type,
      content,
      email,
      status,
      user:userId ( id, username, email )
    `,
    )
    .eq("id", id)
    .single();

  return { data: data as unknown as Inquiry };
}
