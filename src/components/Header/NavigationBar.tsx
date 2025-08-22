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
                currentNav === menu.name ? "font-bold text-primary-600" : ""
              } flex h-8 items-center justify-center px-4`}
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
