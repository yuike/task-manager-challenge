"use client"

import { taskAtomFamily, taskIdsAtom } from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import { useAtom } from "jotai"
import { useAtomCallback } from "jotai/utils"
import React, { useCallback, useEffect, type FC } from "react"
import useSWR from "swr"
import { TaskCard, TaskCardGroup } from "./TaskCard"
import { ErrorMessage } from "./model/ErrorMessage"

export const TaskList: FC = () => {
  const fetcher = (key: string) => fetch(key).then((res) => res.json())
  const { data, error, isLoading } = useSWR("/api/tasks", fetcher)
  const [taskIds, setTaskIds] = useAtom(taskIdsAtom)
  const initializeTasks = useAtomCallback(
    useCallback(
      (get, set, tasks: Task[]) => {
        const newTaskIds = tasks.reduce<number[]>((ids, task) => {
          set(taskAtomFamily(task.id), task)
          ids.push(task.id)
          return ids
        }, [])
        setTaskIds(newTaskIds)
      },
      [setTaskIds],
    ),
  )

  useEffect(() => {
    if (data?.tasks) {
      initializeTasks(data.tasks)
    }
  }, [data, initializeTasks])

  if (isLoading) return <div>Loading...</div>
  if (error) {
    console.error(error)
    return <div>failed to load</div>
  }

  return (
    <>
      <div className="mb-8">
        <ErrorMessage />
      </div>
      <TaskCardGroup>
        {taskIds.map((id) => {
          return <TaskCard key={id} taskId={id} />
        })}
      </TaskCardGroup>
    </>
  )
}
