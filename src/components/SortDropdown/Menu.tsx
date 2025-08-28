"use client";

import { useCallback, useEffect } from "react";
import { useDropdown } from "./context";

interface Props extends React.PropsWithChildren {}

export default function Menu({ children }: Props) {
  const { dropdownRef, isOpen, close } = useDropdown();

  // 메뉴 바깥 영역 클릭 시, 메뉴 닫힘
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    },
    [dropdownRef, isOpen, close],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    isOpen && (
      <ul className="absolute mt-1 w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
        {children}
      </ul>
    )
  );
}
