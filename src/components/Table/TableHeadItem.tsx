interface Props extends React.PropsWithChildren {
  className?: string;
}

export default function TableHeadItem({ className = "", children }: Props) {
  return <th className={`${className} w-full leading-tight`}>{children}</th>;
}
