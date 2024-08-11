import type { ComponentProps, FC } from "react"

interface Props extends Omit<ComponentProps<"button">, "className"> {
  children: React.ReactNode
}

export const Button: FC<Props> = ({ children, ...props }) => (
  <button
    className="flex items-center gap-1 rounded bg-black px-4 py-2 font-bold text-sm text-white transition ease-in hover:opacity-50"
    {...props}
  >
    {children}
  </button>
)
