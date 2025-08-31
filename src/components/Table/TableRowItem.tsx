interface Props {
  className?: string;
  content: string;
}

export default function TableRowItem({ className = "", content }: Props) {
  return <td className={`${className} w-full leading-tight`}>{content}</td>;
}
