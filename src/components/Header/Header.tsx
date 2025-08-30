import Image from "next/image";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import NavigationBar from "./NavigationBar";

type NavName = "사용자 신고" | "게시글/댓글 신고" | "문의";
interface Nav {
  name: NavName;
  href: string;
}
interface Props {
  currentNav?: NavName;
}

export default function Header({ currentNav }: Props) {
  const navs: Nav[] = [
    {
      name: "사용자 신고",
      href: "/user-reports",
    },
    {
      name: "게시글/댓글 신고",
      href: "/content-reports",
    },
    {
      name: "문의",
      href: "/inquiries",
    },
  ];

  return (
    <header className="flex h-13 justify-center border-gray-300 border-b">
      <div className="flex h-full w-full max-w-[1240px] items-center gap-5 px-5">
        {/* 콕콕 로고 */}
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="콕콕 로고"
            width={93}
            height={20}
            priority
          />
        </Link>

        {/* 네비게이션 메뉴 */}
        <NavigationBar allNav={navs} currentNav={currentNav} />

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-3">
          <span className="mx-2 text-sm">이승헌</span>
          <div className="h-4 w-[1px] bg-gray-300" />
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200"
            type="button"
          >
            <TbLogout className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
