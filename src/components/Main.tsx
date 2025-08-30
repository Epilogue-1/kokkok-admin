interface Props extends React.PropsWithChildren {}

export default function Main({ children }: Props) {
  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 pt-3 pb-[60px]">
      {children}
    </main>
  );
}
