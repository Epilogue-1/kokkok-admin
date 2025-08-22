interface Props extends React.PropsWithChildren {}

export default function SubTitle({ children }: Props) {
  return <h2 className="mb-3 font-bold text-lg">{children}</h2>;
}
