import Image from "next/image";
import Link from "next/link";
import { LoginFailAlert, LoginForm } from "@/features/login";
import { loginAction } from "./actions";

export default async function Login(props: PageProps<"/login">) {
  const query = await props.searchParams;
  const isLoginFail = query.status === "fail";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      {/* 로고 */}
      <header>
        <Link
          className="flex flex-col items-center justify-center gap-2"
          href="/"
        >
          <Image
            src="/logo.svg"
            alt="콕콕 로고"
            width={195}
            height={44}
            priority
          />
          <p className="text-gray-500 text-xl">admin</p>
        </Link>
      </header>

      <main className="flex w-full max-w-md flex-col gap-8">
        {/* 로그인 폼 */}
        <LoginForm action={loginAction} />

        {/* 로그인 실패 알림 */}
        {isLoginFail && <LoginFailAlert />}
      </main>
    </div>
  );
}
