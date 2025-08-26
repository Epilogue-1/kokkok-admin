interface Props extends React.ComponentPropsWithoutRef<"button"> {
  size?: "small" | "large";
}

export default function Button({ size = "small", children, ...props }: Props) {
  return (
    <button
      className={`${
        size === "large" ? "h-14 w-full" : "h-9 w-[120px]"
      } flex h-9 cursor-pointer items-center justify-center rounded-md bg-primary-600 font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800`}
      {...props}
    >
      {children}
    </button>
  );
}
