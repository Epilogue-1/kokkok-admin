import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/api/client";
import { getUserComments } from "@/api/comment.server";
import { parsePositiveInt } from "@/utils/int";

// 사용자 댓글들 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // userId가 없으면 사용자의 댓글들을 가져올 수 없기 때문에 400 에러
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const page = parsePositiveInt(searchParams.get("page"), 1); // page 기본값: 1
  const pageSize = parsePositiveInt(searchParams.get("pageSize"), 10); // pageSize 기본값: 10

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 유효한 세션이 없으면 401 Unauthorized
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 관리자 권한이 없으면 403 Forbidden
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, total } = await getUserComments(userId, { page, pageSize });

  return NextResponse.json({ data, total, page, pageSize });
}
