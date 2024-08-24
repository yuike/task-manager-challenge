"use client"
import type { FC } from "react"

import { useAtomValue } from "jotai"

import { taskAtomFamily } from "@/libs/jotai/atoms"
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
  const task = useAtomValue(taskAtomFamily(taskId))
  return (
    <Frame>
      <Title taskId={taskId} title={task.title} />
      <Description taskId={taskId} text={task.description} />
      <Due taskId={taskId} deadline={task.deadline} />
      <Buttons taskId={taskId} />
    </Frame>
  )
}
