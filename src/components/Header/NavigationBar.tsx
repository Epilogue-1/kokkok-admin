import Link from "next/link";

interface Props<NavName extends string> {
  allNav: { name: NavName; href: string }[];
  currentNav?: NavName;
}

export default function NavigationBar<T extends string>({
  allNav,
  currentNav,
}: Props<T>) {
  return (
    <nav className="flex grow">
      <ul className="flex gap-1">
        {allNav.map((nav) => (
          <li key={nav.name}>
            <Link
              // 네비게이션 메뉴 중 현재 메뉴(currentNav) 강조
              className={`${
                currentNav === nav.name
                  ? "font-bold text-primary-600"
                  : "text-black"
              } flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 transition-colors hover:bg-gray-100 active:bg-gray-200`}
              href={nav.href}
            >
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
