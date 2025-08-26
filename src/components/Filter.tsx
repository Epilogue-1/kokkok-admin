interface Props {
  items: string[];
}

export default function Filter({ items }: Props) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex h-8 cursor-pointer items-center rounded-[10px] bg-primary-600 px-4 text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
        >
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
}
