import Image from "next/image";
import Carousel from "@/components/Carousel";

interface Props {
  writerAvatar: string;
  writerName: string;
  createdDate: string;
  images: string[];
  content?: string;
}

export default function PostCard({
  writerAvatar,
  writerName,
  createdDate,
  images,
  content,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 게시글 작성자 아바타 */}
        <Image
          className="h-11 w-11 rounded-full object-cover"
          src={writerAvatar}
          alt="댓글 작성자 아바타"
          width={44}
          height={44}
        />

        {/* 작성자 & 작성일 */}
        <div className="flex flex-col">
          <span>{writerName}</span>
          <span className="text-gray-600 text-sm">{createdDate}</span>
        </div>
      </div>

      {/* 게시글 사진 */}
      <Carousel imagesSrc={images} />

      {/* 게시글 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
