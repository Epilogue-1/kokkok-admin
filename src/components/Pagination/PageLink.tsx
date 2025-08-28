import Link, { type LinkProps } from "next/link";

interface Props extends LinkProps, React.PropsWithChildren {
  active?: boolean;
}

export default function PageLink({
  active = false,
  children,
  ...props
}: Props) {
  const activeStyle = "bg-primary-600 font-medium text-white";
  const inactiveStyle = "text-gray-600 hover:bg-gray-100 active:bg-gray-200";

  return (
    <Link
      className={`${
        active ? activeStyle : inactiveStyle
      } flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors`}
      {...props}
    >
      {children}
    </Link>
  );
}
