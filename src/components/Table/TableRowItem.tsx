interface Props {
  className?: string;
  content: string;
}

export default function TableRowItem({ className = "", content }: Props) {
  if (content.length <= 0) {
    return (
      <td className={`${className} w-full truncate text-gray-400`}>(없음)</td>
    );
  }

  return <td className={`${className} w-full truncate`}>{content}</td>;
}
