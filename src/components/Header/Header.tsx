import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserName, logout } from "@/api/auth.server";
import LogoutButton from "./LogoutButton";
import NavigationBar from "./NavigationBar";

type NavName = "사용자 신고" | "게시글/댓글 신고" | "문의";
interface Nav {
  name: NavName;
  href: string;
}
interface Props {
  currentNav?: NavName;
}

export default async function Header({ currentNav }: Props) {
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

  const userName = await getUserName();

  async function logoutAction() {
    "use server";
    await logout();
    redirect("/login"); // 로그아웃 후 이동
  }

  return (
    <header className="flex h-21 justify-center border-gray-300 border-b md:h-13">
      <div className="flex h-full w-full max-w-[1240px] flex-wrap content-center items-center justify-between gap-x-5 gap-y-2 px-5 md:flex-nowrap">
        {/* 콕콕 로고 */}
        <Link className="order-1" href={"/"}>
          <Image
            src="/logo.svg"
            alt="콕콕 로고"
            width={93}
            height={20}
            priority
          />
        </Link>

        {/* 사용자 메뉴 */}
        <div className="order-2 flex items-center gap-1 md:order-3 md:gap-3">
          <span className="mx-2 text-sm">
            관리자 <strong className="font-semibold">{userName}</strong>
          </span>

          <div className="h-4 w-[1px] bg-gray-300" />

          <LogoutButton logoutAction={logoutAction} />
        </div>

        {/* 네비게이션 메뉴 */}
        <NavigationBar
          className="order-3 w-full items-center md:order-2 md:w-fit"
          allNav={navs}
          currentNav={currentNav}
        />
      </div>
    </header>
  );
}
