"use client";

import Link, { type LinkProps } from "next/link";

interface Props extends LinkProps, React.PropsWithChildren {}

export default function MenuItem({ href, onClick, children }: Props) {
  return (
    <li>
      <Link
        className="flex h-9 w-full cursor-pointer items-center justify-center transition-colors hover:bg-gray-100 active:bg-gray-200"
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
