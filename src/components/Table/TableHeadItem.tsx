interface Props {
  className?: string;
  content: string;
}

export default function TableHeadItem({ className = "", content }: Props) {
  return <th className={`${className} w-full`}>{content}</th>;
}
