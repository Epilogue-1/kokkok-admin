"use client";

import { TbChevronDown } from "react-icons/tb";

interface Props extends React.PropsWithChildren {
  onClick: () => void;
}

export default function Trigger({ onClick, children }: Props) {
  return (
    <button
      className="flex h-9 w-full cursor-pointer items-center rounded-lg border border-gray-300 bg-white pr-2 pl-3 transition-colors hover:bg-gray-100 active:bg-gray-200"
      type="button"
      onClick={onClick}
    >
      <span className="grow text-left">{children}</span>

      <TbChevronDown className="text-gray-600 text-xl" />
    </button>
  );
}
