interface Props extends React.PropsWithChildren {}

// Pagination 컨테이너
export default function Pagination({ children }: Props) {
  return <div className="flex items-center">{children}</div>;
}
