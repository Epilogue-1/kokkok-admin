import Image from "next/image";

interface Props {
  authorAvatarSrc: string;
  author: string;
  createdDate: string;
  content: string;
}

export default function CommentCard({
  authorAvatarSrc,
  author,
  createdDate,
  content,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 댓글 작성자 아바타 */}
        <Image
          className="h-11 w-11 rounded-full object-cover"
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

      {/* 댓글 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
