"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { DropdownContext } from "./context";
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

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      dropdownRef,
      isOpen,
      toggle,
      close,
    }),
    [isOpen, toggle, close],
  );

  return (
    <DropdownContext.Provider value={context}>
      <div className="relative w-[130px]" ref={dropdownRef}>
        {/* 트리거 */}
        <Trigger>{currentLabel}</Trigger>

        {/* 메뉴 */}
        <Menu>
          {items.map((item) => (
            <MenuItem key={item.value} href={createNextUrl(item.value)}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </DropdownContext.Provider>
  );
}
