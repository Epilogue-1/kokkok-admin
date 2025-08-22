import Image from "next/image";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";

export default function Header() {
  return (
    <header className="flex h-14 justify-center border-gray-300 border-b">
      <div className="flex h-full w-full max-w-[1240px] items-center gap-10 px-5">
        {/* 콕콕 로고 */}
        <Image
          src="/logo.svg"
          alt="콕콕 로고"
          width={107}
          height={24}
          priority
        />

        {/* 네비게이션 메뉴 */}
        <nav className="flex grow">
          <ul className="flex gap-1">
            <li>
              <Link
                className="flex h-8 items-center justify-center px-4 font-bold text-primary-600"
                href="/user-reports"
              >
                사용자 신고
              </Link>
            </li>
            <li>
              <Link
                className="flex h-8 items-center justify-center px-4"
                href="/content-reports"
              >
                게시글/댓글 신고
              </Link>
            </li>
            <li>
              <Link
                className="flex h-8 items-center justify-center px-4"
                href="/inquiries"
              >
                문의
              </Link>
            </li>
          </ul>
        </nav>

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-5">
          <span className="text-sm">이승헌</span>
          <div className="h-4 w-[1px] bg-gray-300" />
          <button className="h-8 w-8">
            <TbLogout className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
