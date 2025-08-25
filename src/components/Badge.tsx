type BadgeVariant = "default" | "destructive" | "outline";
type BadgeSize = "small" | "medium" | "large";
interface Props {
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  content: string;
}

export default function Badge({
  className = "",
  variant = "default",
  size = "medium",
  content,
}: Props) {
  const baseStyle = "rounded-sm leading-none";

  const varientStyle: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-600",
    destructive: "bg-red-100 text-red-600",
    outline: "border border-gray-300 text-gray-600",
  };

  const sizeStyle: Record<BadgeSize, string> = {
    small: "px-0.5 py-[1px] text-sm",
    medium: "px-1 py-0.5 text-base",
    large: "px-2 py-1 text-base",
  };

  return (
    <span
      className={`${className} ${baseStyle} ${varientStyle[variant]} ${sizeStyle[size]}`}
    >
      {content}
    </span>
  );
}
