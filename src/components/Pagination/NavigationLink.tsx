import Link, { type LinkProps } from "next/link";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface Props extends LinkProps, React.PropsWithChildren {
  direction: "prev" | "next";
  disabled?: boolean;
}

export default function NavigationLink({
  direction,
  disabled,
  ...props
}: Props) {
  if (disabled) {
    return (
      <span className="pointer-events-none flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-300 text-lg transition-colors">
        {direction === "prev" ? <TbChevronLeft /> : <TbChevronRight />}
      </span>
    );
  }

  return (
    <Link
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 text-lg transition-colors hover:bg-gray-100 active:bg-gray-200"
      {...props}
    >
      {direction === "prev" ? <TbChevronLeft /> : <TbChevronRight />}
    </Link>
  );
}
