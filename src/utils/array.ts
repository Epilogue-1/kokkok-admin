// value를 배열로 만들어주는 함수
export const asArray = <T>(value: T | T[] | undefined | null): T[] => {
  // 배열이면 그대로 반환
  if (Array.isArray(value)) {
    return value;
  }

  // 값이 없다면 빈 배열 반환
  if (value === undefined || value === null) {
    return [];
  }

  // 배열이 아니라면 배열로 만들어서 반환
  return [value];
};
