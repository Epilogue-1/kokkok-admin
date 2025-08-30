interface Props extends React.PropsWithChildren {}

export default function Title({ children }: Props) {
  return <h1 className="mb-2 font-bold text-2xl">{children}</h1>;
}
