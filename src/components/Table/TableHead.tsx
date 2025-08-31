interface Props extends React.PropsWithChildren {}

export default function TableHead({ children }: Props) {
  return (
    <thead>
      <tr className="flex w-full items-center gap-3 border-gray-400 border-b bg-gray-100 px-3 py-[8.75px] font-bold text-sm">
        {children}
      </tr>
    </thead>
  );
}
