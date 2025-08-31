interface Props extends React.PropsWithChildren {
  className?: string;
}

export default function TableRow({ className = "", children }: Props) {
  return (
    <tr
      className={`${className} flex w-full items-center gap-3 border-gray-200 border-b px-3 py-[9.5px] text-base`}
    >
      {children}
    </tr>
  );
}
