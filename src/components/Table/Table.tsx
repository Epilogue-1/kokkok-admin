interface Props extends React.PropsWithChildren {}

export default function Table({ children }: Props) {
  return <table className="flex w-full flex-col">{children}</table>;
}
