import Image from "next/image";
import Carousel from "@/components/Carousel";

interface Props {
  authorAvatarSrc: string;
  author: string;
  createdDate: string;
  imagesSrc: string[];
  content?: string;
}

export default function PostCard({
  authorAvatarSrc,
  author,
  createdDate,
  imagesSrc,
  content,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 게시글 작성자 아바타 */}
        <Image
          className="rounded-full"
          src={authorAvatarSrc}
          alt="댓글 작성자 아바타"
          width={44}
          height={44}
        />

        {/* 작성자 & 작성일 */}
        <div className="flex flex-col">
          <span>{author}</span>
          <span className="text-gray-600 text-sm">{createdDate}</span>
        </div>
      </div>

      {/* 게시글 사진 */}
      <Carousel imagesSrc={imagesSrc} />

      {/* 게시글 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
