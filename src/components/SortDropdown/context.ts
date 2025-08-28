"use client";

import { createContext, useContext } from "react";

interface DropdownContextProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "useDropdown 훅은 Dropdown 컴포넌트 내부에 존재해야 합니다.",
    );
  }

  return context;
};

export { DropdownContext, useDropdown };
