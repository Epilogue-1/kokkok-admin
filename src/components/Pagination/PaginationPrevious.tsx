import Link, { type LinkProps } from "next/link";
import { TbChevronLeft } from "react-icons/tb";

// 공통 속성
interface BaseProps {
  disabled?: boolean;
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

export default function PaginationPrevious({
  as,
  size,
  disabled = false,
  href,
  onClick,
}: Props) {
  const bigStyle = "h-8 w-8 mr-3 text-lg";
  const smallStyle = "h-6 w-6 mr-1 text-sm";

  if (as === "link") {
    return (
      <Link
        className={`flex items-center justify-center rounded-md transition-colors ${disabled ? "pointer-events-none text-gray-300" : "cursor-pointer text-gray-600 hover:bg-gray-100 active:bg-gray-200"} ${size === "big" ? bigStyle : smallStyle}`}
        href={href}
        // disabled일 때 href를 무효화하거나 클릭 이벤트를 차단
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined} // 키보드 접근 차단
      >
        <TbChevronLeft />
      </Link>
    );
  }

  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:text-gray-300 ${size === "big" ? bigStyle : smallStyle}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <TbChevronLeft />
    </button>
  );
}
