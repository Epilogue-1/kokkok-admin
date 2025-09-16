import Image from "next/image";

interface Props {
  avatar: string;
  background: string;
  name: string;
  introduction: string;
}

export default function ProfileCard({
  avatar,
  background,
  name,
  introduction,
}: Props) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-gray-300">
      {/* 프로필 배경 사진 */}
      <div className="relative h-[120px] w-full">
        {background ? (
          <Image
            className="object-cover"
            src={background}
            alt="프로필 배경사진"
            fill
            sizes="100vh"
            priority
          />
        ) : (
          <div className="flex h-full w-full select-none items-center justify-center bg-gray-50 text-gray-300">
            사진 없음
          </div>
        )}
      </div>

      {/* 프로필 아바타 사진 */}
      <Image
        className="absolute top-20 left-4 rounded-full border-[3px] border-white"
        src={avatar}
        alt="프로필 아바타"
        height={80}
        width={80}
      />

      {/* 사용자 이름 & 소개 */}
      <div className="flex flex-col gap-1 px-4 pt-12 pb-3">
        <span className="font-bold">{name}</span>
        <p className="whitespace-pre-wrap">{introduction}</p>
      </div>
    </div>
  );
}
