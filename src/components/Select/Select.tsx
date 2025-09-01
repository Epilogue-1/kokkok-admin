"use client";

import { useCallback, useRef, useState } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Trigger from "./Trigger";

interface Props {
  items: { label: string; destructive?: boolean }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({ items, value, setValue }: Props) {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // value가 destructive인지
  const isValueDestructive =
    items.find((item) => item.label === value)?.destructive === true;

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Select 외부 영역 클릭 시, 메뉴 닫기
  const handleMousedownMenu = useCallback(
    (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  const handleClickMenuItem = (value: string) => {
    closeMenu();
    setValue(value);
  };

  return (
    <div className="relative w-[120px]" ref={selectRef}>
      {/* 트리거 */}
      <Trigger onClick={toggleMenu} destructive={isValueDestructive}>
        {value}
      </Trigger>

      {/* 메뉴 */}
      {isOpen && (
        <Menu onMousedown={handleMousedownMenu}>
          {items.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => handleClickMenuItem(item.label)}
              destructive={item?.destructive}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}
