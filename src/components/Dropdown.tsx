import { TbChevronDown } from "react-icons/tb";

interface Props {
  content: string;
}

export default function Dropdown({ content }: Props) {
  return (
    <div className="flex h-9 w-[120px] cursor-pointer items-center rounded-lg border border-gray-300 bg-white pr-3 pl-4">
      <span className="grow">{content}</span>
      <TbChevronDown className="text-gray-600 text-xl" />
    </div>
  );
}
