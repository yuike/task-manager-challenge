"use client"
import type { FC } from "react"

import { useAtom } from "jotai"

import { taskAtomFamily } from "@/libs/atoms"
import { Buttons } from "./Buttons"
import { Description } from "./Description"
import { Due } from "./Due"
import { Title } from "./Title"

interface Props {
  taskId: number
}

interface FrameProps {
  children: React.ReactNode
}

const Frame: FC<FrameProps> = ({ children }) => {
  return (
    <section className="relative space-y-4 rounded-2xl border border-gray-200 px-5 py-7 text-xs">
      {children}
    </section>
  )
}

export const TaskCard: FC<Props> = ({ taskId }) => {
  const [task] = useAtom(taskAtomFamily(taskId))
  return (
    <Frame>
      <Title taskId={task.id} />
      <Description taskId={task.id} />
      <Due taskId={task.id} />
      <Buttons taskId={task.id} />
    </Frame>
  )
}
