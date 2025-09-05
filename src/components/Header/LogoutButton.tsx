"use client";

import { TbLogout } from "react-icons/tb";

interface Props {
  logoutAction: () => Promise<void>;
}

export default function LogoutButton({ logoutAction }: Props) {
  const handleClick = async () => {
    await logoutAction();
  };

  return (
    <button
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200"
      type="button"
      onClick={handleClick}
    >
      <TbLogout className="text-xl" />
    </button>
  );
}
