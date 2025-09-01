"use client";

import { useEffect } from "react";

interface Props extends React.PropsWithChildren {
  onMousedown: (event: MouseEvent) => void;
}

export default function Menu({ onMousedown, children }: Props) {
  useEffect(() => {
    document.addEventListener("mousedown", onMousedown);
    return () => {
      document.removeEventListener("mousedown", onMousedown);
    };
  }, [onMousedown]);

  return (
    <ul className="absolute mt-1 w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
      {children}
    </ul>
  );
}
