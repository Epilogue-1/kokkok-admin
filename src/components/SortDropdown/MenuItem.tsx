"use client";

import Link, { type LinkProps } from "next/link";
import { useDropdown } from "./context";

interface Props extends LinkProps, React.PropsWithChildren {
  value?: string;
}

export default function MenuItem({ children, ...props }: Props) {
  const { close } = useDropdown();

  return (
    <li>
      <Link
        className="flex h-9 w-full cursor-pointer items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
        onClick={close}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}
