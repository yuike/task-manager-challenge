import Link from "next/link"
import type { FC } from "react"

interface Props {
  icon: React.ReactNode
  to: string
  children: React.ReactNode
}

export const NavigationItem: FC<Props> = ({ icon, to, children }) => (
  <li>
    <Link className="flex items-center gap-3 subpixel-antialiased" href={to}>
      <div className="text-xl">{icon}</div>
      {children}
    </Link>
  </li>
)
