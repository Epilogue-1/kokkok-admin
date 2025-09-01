interface Props {
  total: number;
  current: number;
}

export default function PaginationDots({ total, current }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: 단순 반복 UI라 index key 사용해도 안전함
          key={index}
          className={`${
            current === index + 1 ? "w-3 bg-primary-600" : "w-1.5 bg-gray-300"
          } h-1.5 rounded-full transition-all`}
        />
      ))}
    </div>
  );
}
