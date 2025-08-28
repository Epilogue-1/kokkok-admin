// value를 문자열 배열로 만들어주는 함수
export const asArray = (value: string | string[] | undefined): string[] => {
  if (typeof value === "string") {
    return [value];
  }
  if (value === undefined) {
    return [];
  }
  return value;
};
