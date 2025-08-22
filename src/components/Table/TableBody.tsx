interface Props extends React.PropsWithChildren {}

export default function TableBody({ children }: Props) {
  return <tbody>{children}</tbody>;
}
