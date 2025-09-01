"use client";

import Image from "next/image";
import { useState } from "react";
import NavigationButton from "./NavigationButton";
import PaginationDots from "./PaginationDots";

interface Props {
  imagesSrc: string[];
}

export default function Carousel({ imagesSrc }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = imagesSrc.length;

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-8">
        {/* 이전 버튼 */}
        <NavigationButton
          direction="prev"
          disabled={!hasPrevPage}
          onClick={prevPage}
        />

        {/* 사진들 */}
        <div className="relative h-[320px] w-[320px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
          >
            {imagesSrc.map((src, index) => (
              <Image
                // biome-ignore lint/suspicious/noArrayIndexKey: 단순 반복 UI라 index key 사용해도 안전함
                key={index}
                className="shrink-0 select-none"
                src={src}
                alt={`게시글 사진 ${index + 1}`}
                width={320}
                height={320}
              />
            ))}
          </div>
        </div>

        {/* 다음 버튼 */}
        <NavigationButton
          direction="next"
          disabled={!hasNextPage}
          onClick={nextPage}
        />
      </div>

      {/* 사진 순서 표시 */}
      <PaginationDots total={totalPages} current={currentPage} />
    </div>
  );
}
