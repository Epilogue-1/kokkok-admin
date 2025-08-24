interface Props extends React.ComponentPropsWithoutRef<"button"> {
  size?: "small" | "large";
}

export default function Button({ size = "small", children, ...props }: Props) {
  return (
    <button
      className={`${
        size === "large" ? "h-14 w-full" : "h-9 w-[120px]"
      } flex h-9 w-[120px] items-center justify-center rounded-md bg-primary-600 font-semibold text-white`}
      {...props}
    >
      {children}
    </button>
  );
}
