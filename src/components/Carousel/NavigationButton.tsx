"user client";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface Props extends React.PropsWithChildren {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
}

export default function NavigationButton({
  direction,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:text-gray-300"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <TbChevronLeft className="h-8 w-8" />
      ) : (
        <TbChevronRight className="h-8 w-8" />
      )}
    </button>
  );
}
