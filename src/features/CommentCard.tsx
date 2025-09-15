import Image from "next/image";

interface Props {
  writerAvatar: string;
  writerName: string;
  createdDate: string;
  content: string;
}

export default function CommentCard({
  writerAvatar,
  writerName,
  createdDate,
  content,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 px-4 py-3">
      <div className="flex items-center gap-3">
        {/* 댓글 작성자 아바타 */}
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

      {/* 댓글 내용 */}
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}
