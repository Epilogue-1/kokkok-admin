interface Props extends React.PropsWithChildren {}

export default function TableRow({ children }: Props) {
  return (
    <tr className="flex h-10 w-full items-center gap-3 border-gray-200 border-b px-3 text-base">
      {children}
    </tr>
  );
}
