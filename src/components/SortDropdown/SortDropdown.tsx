"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Trigger from "./Trigger";

interface Props {
  items: { label: string; value: string }[];
}

const QUERY_KEY = "sort";

export default function SortDropdown({ items }: Props) {
  const searchParams = useSearchParams();

  // query 값을 가져와 트리거 내용으로 사용
  const currentValue = searchParams.get(QUERY_KEY);
  const currentLabel =
    items.find((item) => item.value === currentValue)?.label ?? items[0].label;

  // MenuItem 클릭 시 이동할 Url 생성 (기존 쿼리 유지)
  const createNextUrl = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(QUERY_KEY, value);
      return `?${next.toString()}`;
    },
    [searchParams],
  );

  // 메뉴를 열고 닫기 위한 ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // SortDropdown 외부 영역 클릭 시, 메뉴 닫기
  const handleMousedownMenu = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  return (
    <div className="relative w-[120px]" ref={dropdownRef}>
      {/* 트리거 */}
      <Trigger onClick={toggleMenu}>{currentLabel}</Trigger>

      {/* 메뉴 */}
      {isOpen && (
        <Menu onMousedown={handleMousedownMenu}>
          {items.map((item) => (
            <MenuItem
              key={item.value}
              href={createNextUrl(item.value)}
              onClick={closeMenu}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
