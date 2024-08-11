import type { FC } from "react"

interface Props {
  children: React.ReactNode
}

export const TaskCardGroup: FC<Props> = ({ children }) => (
  <ul className="space-y-2">{children}</ul>
)
