interface Props extends React.PropsWithChildren {}

export default function Title({ children }: Props) {
  return <h1 className="mb-5 font-bold text-2xl">{children}</h1>;
}
