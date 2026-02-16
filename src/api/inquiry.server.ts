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

// id에 맞는 문의 상태를 변경
export async function updateInquiryStatus(id: string, status: Status) {
  const supabase = await createClient();

  const { error: updateError } = await supabase
    .from("inquiry")
    .update({ status: status })
    .eq("id", id);

  if (updateError) {
    throw updateError;
  }
}

type InquiryLogType = "memo" | "statusChange";
interface InquiryLog {
  id: number;
  createdAt: string;
  inquiryId: string;
  type: InquiryLogType;
  memo: string | null;
  prevStatus: Status | null;
  nextStatus: Status | null;
  user: {
    userId: string;
    name: string;
  };
}

// id에 맞는 문의 로그들 조회
export async function getInquiryLogsById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("inquiryLog")
    .select(
      `
      id,
      createdAt,
      inquiryId,
      type,
      memo,
      prevStatus,
      nextStatus,
      user:adminId ( userId, name )
    `,
    )
    .eq("inquiryId", id)
    .order("createdAt", { ascending: true });

  return { data: data as unknown as InquiryLog[] };
}

// 문의 메모 로그 추가
export async function addInquiryMemoLog(id: string, memo: string) {
  const supabase = await createClient();

  // 관리자 정보 조회
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("관리자 정보를 확인할 수 없습니다.");
  }

  // 문의 메모에 대한 로그 추가
  const { error: insertError } = await supabase.from("inquiryLog").insert({
    inquiryId: id,
    adminId: user.id,
    type: "memo",
    memo,
  });

  if (insertError) {
    throw insertError;
  }
}

interface StatusChangeOptions {
  prevStatus: Status;
  nextStatus: Status;
  memo?: string;
}

// 문의 상태 변경 로그 추가
export async function addInquiryStatusChangeLog(
  id: string,
  { prevStatus, nextStatus, memo }: StatusChangeOptions,
) {
  const supabase = await createClient();

  // 관리자 정보 조회
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("관리자 정보를 확인할 수 없습니다.");
  }

  // 문의 상태 변경에 대한 로그 추가
  const { error: insertError } = await supabase.from("inquiryLog").insert({
    inquiryId: id,
    adminId: user.id,
    type: "statusChange",
    prevStatus,
    nextStatus,
    memo,
  });

  if (insertError) {
    throw insertError;
  }
}
