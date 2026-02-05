import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, {
              ...options,
              maxAge: undefined,
              expires: undefined,
            });
          });
        } catch {
          // Server Component 안에서 쿠키 설정(setAll) 시도 시 에러 발생
          // 하지만 Supabase는 Middleware가 세션을 알아서 갱신하기 때문에 에러 발생해도 괜찮음
          // 따라서 에러를 무시하기 위해 빈 catch 문 사용
        }
      },
    },
  });
}
