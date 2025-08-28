import Link, { type LinkProps } from "next/link";

interface Props extends LinkProps, React.PropsWithChildren {
  active?: boolean;
}

export default function FilterItem({
  active = false,
  children,
  ...props
}: Props) {
  const activeStyle =
    "border border-primary-600 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800";
  const inactiveStyle =
    "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 active:bg-gray-200";

  return (
    <Link
      className={`${
        active ? activeStyle : inactiveStyle
      } flex h-8 cursor-pointer items-center rounded-lg px-4 transition-colors`}
      {...props}
    >
      <span className="font-medium">{children}</span>
    </Link>
  );
}
