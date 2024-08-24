import type { FC } from "react"

interface Props {
  children: React.ReactNode
}

export const TaskFrame: FC<Props> = ({ children }) => {
  return (
    <section className="relative space-y-4 rounded-2xl border border-gray-200 px-5 py-7 text-xs">
      {children}
    </section>
  )
}
