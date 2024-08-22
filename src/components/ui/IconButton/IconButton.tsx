import type { ComponentProps, FC } from "react"

interface Props extends Omit<ComponentProps<"button">, "className"> {
  icon: React.ReactNode
  variant?: "default" | "confirm" | "danger"
}

export const IconButton: FC<Props> = ({
  icon,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "hover:bg-black",
    confirm: "hover:bg-emerald-500",
    danger: "hover:bg-rose-500",
  }
  return (
    <button
      type="button"
      className={`rounded-full p-2 text-lg transition ease-in-out hover:text-white disabled:opacity-20 ${variantStyles[variant]}`}
      {...props}
    >
      {icon}
    </button>
  )
}
