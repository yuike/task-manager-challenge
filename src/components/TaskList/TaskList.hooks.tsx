import { fetcher } from "@/libs/SWR/fetcher"
import {
  errorMessageAtom,
  taskAtomFamily,
  taskIdsAtom,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import { useAtom, useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback, useEffect } from "react"
import useSWR from "swr"

export const useTaskList = () => {
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

  const errorMessage = useAtomValue(errorMessageAtom)

  return {
    errorMessage,
    swr: { data, error, isLoading },
    taskIds,
  }
}
