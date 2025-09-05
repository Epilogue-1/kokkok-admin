import "server-only";
import { createClient } from "@/api/client";

type SignInOk = { ok: true };
type SignInFail = { ok: false; message: string };
type SignInResult = SignInOk | SignInFail;

export async function login(
  email: string,
  password: string,
): Promise<SignInResult> {
  const supabase = await createClient();

  // 유저인지 확인
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data?.user || !data?.session) {
    return { ok: false, message: error?.message ?? "로그인에 실패했습니다." };
  }

  // 해당 유저가 관리자인지 확인
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    return { ok: false, message: "로그인에 실패했습니다." };
  }

  return { ok: true };
}
