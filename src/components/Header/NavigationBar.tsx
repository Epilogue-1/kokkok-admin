import Link from "next/link";

export type NavMenuName = "사용자 신고" | "게시글/댓글 신고" | "문의";
interface NavMenu {
  name: NavMenuName;
  href: string;
}

interface Props {
  currentNav: NavMenuName;
}

export default function NavigationBar({ currentNav }: Props) {
  // TODO: menu 위치를 상단 컴포넌트인 Header로 옮기기 (NavigationBar에서 allNav로 받기)
  const menus: NavMenu[] = [
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
    <nav className="flex grow">
      <ul className="flex gap-1">
        {menus.map((menu) => (
          <li key={menu.name}>
            <Link
              // 네비게이션 메뉴 중 현재 메뉴(currentNav) 강조
              className={`${
                currentNav === menu.name
                  ? "font-bold text-primary-600"
                  : "text-black"
              } flex h-8 cursor-pointer items-center justify-center rounded-lg px-4 transition-colors hover:bg-gray-100 active:bg-gray-200`}
              href={menu.href}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
