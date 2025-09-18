export const formatToKoreanDate = (isoString: string): string => {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    throw new Error("올바르지 않은 날짜 형식입니다.");
  }

  const year = date.toLocaleString("ko-KR", {
    year: "numeric",
    timeZone: "Asia/Seoul",
  });
  const month = date.toLocaleString("ko-KR", {
    month: "numeric",
    timeZone: "Asia/Seoul",
  });
  const day = date.toLocaleString("ko-KR", {
    day: "numeric",
    timeZone: "Asia/Seoul",
  });

  return `${year} ${month} ${day}`; // "2025년 9월 16일"
};
