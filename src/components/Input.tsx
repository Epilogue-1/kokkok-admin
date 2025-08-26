interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className="h-12 rounded-lg border border-gray-300 px-4 placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
      {...props}
    />
  );
}
