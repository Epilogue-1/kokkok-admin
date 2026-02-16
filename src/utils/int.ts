// 문자열을 양의 정수로 변환, 변환 실패 시 기본값(fallback) 반환
export const parsePositiveInt = (value: string | null, fallback: number) => {
  // value가 null이거나 숫자가 아닌 문자열이면, NaN이 됨
  const parsed = Number(value);

  // NaN, Infinity, -Infinity 이거나 음수일 경우 기본값(fallback) 반환
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  // floor 처리하여 정수로 반환
  return Math.floor(parsed);
};
