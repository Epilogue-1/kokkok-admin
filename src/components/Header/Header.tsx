import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import NavigationBar, { type NavMenuName } from "./NavigationBar";

interface Props {
  currentNav: NavMenuName;
}

export default function Header({ currentNav }: Props) {
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
        <NavigationBar currentNav={currentNav} />

        {/* 사용자 메뉴 */}
        <div className="flex items-center gap-5">
          <span className="text-sm">이승헌</span>
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
