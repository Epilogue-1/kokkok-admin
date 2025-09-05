"use server";

import { redirect } from "next/navigation";
import { login } from "@/api/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  // 폼 내용으로 로그인 시도
  const res = await login(email, password);

  // 로그인 성공 시, 사용자 신고 페이지로 이동
  if (res.ok) {
    redirect("/user-reports");
  }

  // 로그인 실패 시, 쿼리스트링으로 실패 전달
  redirect("/login?status=fail");
}
