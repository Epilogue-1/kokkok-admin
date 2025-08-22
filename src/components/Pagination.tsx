import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

export default function Pagination() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-300 text-lg">
        <TbChevronLeft />
      </div>

      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 font-medium text-white">
        <span>1</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600">
        <span>2</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600">
        <span>3</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600">
        <span>4</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600">
        <span>5</span>
      </div>

      <div className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 text-lg">
        <TbChevronRight />
      </div>
    </div>
  );
}
