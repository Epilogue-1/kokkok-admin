import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  // 반환할 응답
  const response = NextResponse.next();

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    // request의 쿠키를 response에 설정
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        cookies.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // 사용자가 로그인했는지 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  const pathname = request.nextUrl.pathname;

  // 로그인 안했는데 로그인 페이지가 아닌 페이지로 진입할 경우, 로그인 페이지로 이동
  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인했는데 로그인 페이지로 진입할 경우, 홈 페이지로 이동
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 해당 없으면 통과
  return response;
}

export const config = {
  matcher: [
    // 요청 경로가 아래와 같다면 middleware 적용 X
    // - api (API 라우트)
    // - _next/static (정적 파일)
    // - _next/image (이미지 최적화 파일)
    // - favicon.ico (파비콘)
    // - 확장자가 있는 모든 파일 (e.g. .svg, .png, .jpg, .js, .css)
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)",
  ],
};
