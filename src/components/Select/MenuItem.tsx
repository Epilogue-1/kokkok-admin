"use client";

interface Props extends React.PropsWithChildren {
  onClick: () => void;
  destructive?: boolean;
}

export default function MenuItem({
  onClick,
  destructive = false,
  children,
}: Props) {
  const defaultStyle = "bg-white hover:bg-gray-100 active:bg-gray-200";
  const destructiveStyle =
    "bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200";

  return (
    <li>
      <button
        className={`${
          destructive ? destructiveStyle : defaultStyle
        } flex h-9 w-full cursor-pointer items-center justify-center transition-colors`}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}
