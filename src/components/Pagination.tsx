import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

export default function Pagination() {
  return (
    <div className="flex gap-3">
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 text-lg transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:text-gray-300"
        type="button"
        disabled
      >
        <TbChevronLeft />
      </button>

      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-primary-600 font-medium text-white transition-colors"
        type="button"
      >
        <span>1</span>
      </button>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
      >
        <span>2</span>
      </button>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
      >
        <span>3</span>
      </button>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
      >
        <span>4</span>
      </button>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200"
        type="button"
      >
        <span>5</span>
      </button>

      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 text-lg transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:text-gray-300"
        type="button"
      >
        <TbChevronRight />
      </button>
    </div>
  );
}
