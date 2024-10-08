"use client"

import { ErrorMessage } from "@/components/ErrorMessage"
import { TaskCard, TaskCardGroup } from "@/components/TaskCard"
import type { FC } from "react"
import { AddButton } from "../AddButton"
import { useTaskList } from "./TaskList.hooks"

export const TaskList: FC = () => {
  const {
    errorMessage,
    swr: { error, isLoading },
    taskIds,
  } = useTaskList()

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>failed to load</div>
  }

  return (
    <>
      <div className="absolute top-10 right-4">
        <AddButton />
      </div>
      {errorMessage && (
        <div className="mb-8">
          <ErrorMessage />
        </div>
      )}
      <TaskCardGroup>
        {taskIds.map((id) => {
          return <TaskCard key={id} taskId={id} />
        })}
      </TaskCardGroup>
    </>
  )
}
