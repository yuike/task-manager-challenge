"use client"
import type { FC } from "react"

import { useAtomValue } from "jotai"

import { taskAtomFamily } from "@/libs/jotai/atoms"
import { Buttons } from "./Buttons"
import { Description } from "./Description"
import { Due } from "./Due"
import { TaskFrame } from "./TaskFrame"
import { Title } from "./Title"

interface Props {
  taskId: number
}

export const TaskCard: FC<Props> = ({ taskId }) => {
  const task = useAtomValue(taskAtomFamily(taskId))
  return (
    <TaskFrame>
      <Title taskId={taskId} title={task.title} />
      <Description taskId={taskId} text={task.description} />
      <Due taskId={taskId} deadline={task.deadline} />
      <Buttons taskId={taskId} />
    </TaskFrame>
  )
}
