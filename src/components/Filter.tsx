interface Props {
  items: string[];
}

export default function Filter({ items }: Props) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex h-8 items-center rounded-[10px] bg-primary-600 px-4 text-white"
        >
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
}
