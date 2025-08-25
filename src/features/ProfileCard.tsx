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
    <div className="relative flex flex-col border border-gray-300 rounded-xl overflow-hidden">
      {/* 프로필 배경 사진 */}
      <div className="relative w-full h-[120px]">
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
        className="absolute left-5 top-20 border-[3px] border-white rounded-full"
        src={avatarSrc}
        alt="프로필 아바타"
        height={80}
        width={80}
      />

      {/* 사용자 이름 & 소개 */}
      <div className="flex flex-col px-5 pb-5 pt-12 gap-2">
        <span className="font-bold">{name}</span>
        <p className="whitespace-pre-wrap">{introduction}</p>
      </div>
    </div>
  );
}
