interface Props extends React.PropsWithChildren {}

export default function TableRow({ children }: Props) {
  return (
    <tr className="flex min-h-10 w-full items-center gap-3 border-gray-200 border-b px-3 py-[10px] text-base">
      {children}
    </tr>
  );
}
