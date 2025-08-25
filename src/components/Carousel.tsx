import Image from "next/image";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface Props {
  imagesSrc: string[];
}

export default function Carousel({ imagesSrc }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-8">
        {/* 이전 버튼 */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          type="button"
        >
          <TbChevronLeft className="h-8 w-8 text-gray-300" />
        </button>

        {/* 사진들 */}
        <Image
          className="border border-gray-200"
          src={imagesSrc[0]}
          alt="게시글 사진"
          width={320}
          height={320}
        />

        {/* 다음 버튼 */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          type="button"
        >
          <TbChevronRight className="h-8 w-8 text-gray-600" />
        </button>
      </div>

      {/* 사진 순서 표시 */}
      <div className="flex gap-1">
        <div className="h-1.5 w-3 rounded-full bg-primary-600" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
