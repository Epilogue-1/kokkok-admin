export const formatToKoreanDate = (isoString: string): string => {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    throw new Error("올바르지 않은 날짜 형식입니다.");
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
