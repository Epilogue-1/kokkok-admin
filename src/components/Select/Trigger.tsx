"use client";

import { TbChevronDown } from "react-icons/tb";

interface Props extends React.PropsWithChildren {
  onClick: () => void;
  destructive?: boolean;
}

export default function Trigger({ onClick, destructive, children }: Props) {
  const defaultStyle = "bg-white hover:bg-gray-100 active:bg-gray-200";
  const destructiveStyle =
    "bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200";

  const iconDefaultStyle = "text-gray-600";
  const iconDestructiveStyle = "text-red-700";

  return (
    <button
      className={`${
        destructive ? destructiveStyle : defaultStyle
      } flex h-9 w-full cursor-pointer items-center rounded-lg border border-gray-300 pr-2 pl-3 transition-colors`}
      type="button"
      onClick={onClick}
    >
      <span className="grow text-left">{children}</span>

      <TbChevronDown
        className={`${
          destructive ? iconDestructiveStyle : iconDefaultStyle
        } text-xl`}
      />
    </button>
  );
}
