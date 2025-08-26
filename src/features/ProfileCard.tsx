import Image from "next/image";

interface Props {
  avatarSrc: string;
  backgroundSrc: string;
  name: string;
  introduction: string;
}

export default function ProfileCard({
  avatarSrc,
  backgroundSrc,
  name,
  introduction,
}: Props) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-gray-300">
      {/* 프로필 배경 사진 */}
      <div className="relative h-[120px] w-full">
        <Image
          className="object-cover"
          src={backgroundSrc}
          alt="프로필 배경사진"
          fill
          sizes="100vh"
          priority
        />
      </div>

      {/* 프로필 아바타 사진 */}
      <Image
        className="absolute top-20 left-5 rounded-full border-[3px] border-white"
        src={avatarSrc}
        alt="프로필 아바타"
        height={80}
        width={80}
      />

      {/* 사용자 이름 & 소개 */}
      <div className="flex flex-col gap-2 px-5 pt-12 pb-5">
        <span className="font-bold">{name}</span>
        <p className="whitespace-pre-wrap">{introduction}</p>
      </div>
    </div>
  );
}
