"use client";

import { TbChevronDown } from "react-icons/tb";
import { useDropdown } from "./context";

interface Props extends React.PropsWithChildren {}

export default function Trigger({ children }: Props) {
  const { toggle } = useDropdown();

  // 트리거 클릭 시, 메뉴 열림
  return (
    <button
      className="flex h-9 w-full cursor-pointer items-center rounded-lg border border-gray-300 bg-white pr-2 pl-3 transition-colors hover:bg-gray-100 active:bg-gray-200"
      type="button"
      onClick={toggle}
    >
      <span className="grow text-left">{children}</span>
      <TbChevronDown className="text-gray-600 text-xl" />
    </button>
  );
}
