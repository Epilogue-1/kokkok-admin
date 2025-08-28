import Link from "next/link";
import { asArray } from "@/utils/array";

type SearchParams = Record<string, string | string[] | undefined>;
interface Props {
  query: SearchParams;
  queryKey: string;
  items: { label: string; value: string }[];
}

export default function Filter({ query, queryKey, items }: Props) {
  // 활성화/비활성화 스타일
  const activeItemStyle =
    "border border-primary-600 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800";
  const inactiveItemStyle =
    "border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 active:bg-gray-200";

  const activeValues = asArray(query?.[queryKey]);
  const isAllActive = activeValues.length === 0;
  const isValueActive = (value: string) =>
    isAllActive || activeValues.includes(value);

  // 다음 쿼리 계산
  const createNextQuery = (currentValue: string): SearchParams => {
    // Case 1: 모든 item이 활성화된 상태 (query가 빈 상태)
    // 현재 item 외의 item들을 쿼리에 추가
    if (isAllActive) {
      const allItemValues = items.map((item) => item.value);
      const nextValues = allItemValues.filter(
        (value) => value !== currentValue,
      );
      return {
        ...query,
        [queryKey]: nextValues,
      };
    }

    // Case 2: 일부 item만 활성화된 상태
    const isCurrentValueActive = activeValues.includes(currentValue);

    // 현재 item이 활성화 상태라면, currentValue를 쿼리에서 제거
    if (isCurrentValueActive) {
      // 단, 1개 남은 활성화된 item이라면 비활성화 불가
      // 최소한 1개의 item은 활성화되어야 함
      if (activeValues.length === 1) {
        return query;
      }

      const nextValues = activeValues.filter((value) => value !== currentValue);
      return {
        ...query,
        [queryKey]: nextValues,
      };
    }

    // 현재 item이 비활성화 상태라면, currentValue를 쿼리에 추가
    const nextValues = [...activeValues, currentValue];
    return {
      ...query,
      [queryKey]: nextValues,
    };
  };

  return (
    <div className="flex gap-2">
      {items.map((item, index) => (
        <Link
          key={`${item.value} ${index}`}
          href={{
            query: createNextQuery(item.value),
          }}
          // 활성화된 item이라면 강조
          className={`${
            isValueActive(item.value) ? activeItemStyle : inactiveItemStyle
          } flex h-8 cursor-pointer items-center rounded-lg px-4 transition-colors`}
        >
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
