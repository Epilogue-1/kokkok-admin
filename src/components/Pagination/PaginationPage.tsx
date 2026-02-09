import Link, { type LinkProps } from "next/link";

// 공통 속성
interface BaseProps extends React.PropsWithChildren {
  active?: boolean;
  size: "big" | "small";
}
// link일 때: href 필수, onClick 금지
interface AsLink extends BaseProps {
  as: "link";
  href: LinkProps["href"];
  onClick?: never;
}
// button일 때: href 금지, onClick 필수
interface AsButton extends BaseProps {
  as: "button";
  href?: never;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
// 최종 유니온 타입
type Props = AsLink | AsButton;

export default function PaginationPage({
  as,
  size,
  active = false,
  href,
  onClick,
  children,
}: Props) {
  const activeStyle = "bg-primary-600 font-medium text-white";
  const inactiveStyle = "text-gray-600 hover:bg-gray-100 active:bg-gray-200";

  const bigStyle = "h-8 w-8 mr-3 text-base";
  const smallStyle = "h-6 w-6 mr-1 text-sm";

  if (as === "link") {
    return (
      <Link
        className={`flex cursor-pointer items-center justify-center rounded-md transition-colors ${active ? activeStyle : inactiveStyle} ${size === "big" ? bigStyle : smallStyle}`}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-md transition-colors ${active ? activeStyle : inactiveStyle} ${size === "big" ? bigStyle : smallStyle}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
