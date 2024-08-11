import IconCheck from "@/icons/IconCheck"
import IconList from "@/icons/IconList"
import IconTimer from "@/icons/IconTimer"
import Link from "next/link"
import type { FC } from "react"
import { NavigationItem } from "./NavigationItem"

export const Navigation: FC = () => {
  return (
    <nav className="col-span-3 min-h-screen border-gray-200 border-r">
      <section className="mx-12 my-12">
        <Link href="/">
          <div className="flex items-center subpixel-antialiased">
            <IconTimer className="text-2xl" />
            <h1 className="ml-2 font-bold text-xs tracking-wider">
              Task Manager
            </h1>
          </div>
        </Link>

        <ul className="mt-12 ml-4 space-y-6 text-xs">
          <NavigationItem icon={<IconList />} to="/">
            My Tasks
          </NavigationItem>
          <NavigationItem icon={<IconCheck />} to="/completed">
            Completed
          </NavigationItem>
        </ul>
      </section>
    </nav>
  )
}
