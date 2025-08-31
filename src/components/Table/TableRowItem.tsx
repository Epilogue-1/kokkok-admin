interface Props extends React.PropsWithChildren {
  className?: string;
}

export default function TableRowItem({ className = "", children }: Props) {
  return <td className={`${className} w-full leading-tight`}>{children}</td>;
}
