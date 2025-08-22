import Image from "next/image";
import { TbAlertCircleFilled } from "react-icons/tb";
import Input from "@/components/Input";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      {/* 로고 */}
      <header className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/logo.svg"
          alt="콕콕 로고"
          width={195}
          height={44}
          priority
        />
        <p className="text-gray-500 text-xl">admin</p>
      </header>

      {/* 로그인 폼 */}
      <main className="flex w-full max-w-md flex-col gap-8">
        <form className="flex flex-col">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor="id">
              아이디
            </label>
            <Input id="id" placeholder="아이디를 입력해주세요" />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <label className="font-semibold text-sm" htmlFor="password">
              비밀번호
            </label>
            <Input id="password" placeholder="비밀번호를 입력해주세요" />
          </div>

          <button
            className="mt-8 flex h-14 items-center justify-center rounded-md bg-primary-600 font-semibold text-white"
            type="submit"
          >
            로그인
          </button>
        </form>

        {/* 로그인 실패 알림 */}
        <div className="flex items-center gap-2 rounded-[10px] border border-gray-200 bg-red-50 p-5 text-red-700">
          <TbAlertCircleFilled className="text-lg" />
          <p className="font-semibold text-sm">
            관리자만 로그인할 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  );
}
