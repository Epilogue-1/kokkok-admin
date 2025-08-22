interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className="h-12 rounded-lg border border-gray-300 px-4 placeholder:text-gray-400"
      {...props}
    />
  );
}
