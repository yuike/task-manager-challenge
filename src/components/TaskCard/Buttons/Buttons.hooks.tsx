import {
  errorMessageAtom,
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { registerTask } from "@/services/registerTask"
import { updateTask } from "@/services/updateTask"
import type { Task } from "@/types/Task"
import dayjs from "dayjs"
import { useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback } from "react"

export const useButtons = (taskId: number) => {
  const isEditing = useAtomValue(taskIsEditingAtomFamily(taskId))
  const taskIds = useAtomValue(taskIdsAtom)
  const task = useAtomValue(taskAtomFamily(taskId))

  // TODO: handleXXXTaskは大部分で似通った処理をしているので、共通化できる
  /**
   * タスクを新規登録する
   */
  const handleRegisterTask = useAtomCallback(
    useCallback(
      async (get, set) => {
        if (isEditing) {
          const currentTask = get(taskAtomFamily(taskId))
          if (currentTask.title === "") {
            set(errorMessageAtom, "Title is required.")
            return
          }
          const newTask: Task = {
            ...currentTask,
            status: "todo",
            updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          }
          set(taskAtomFamily(taskId), newTask)
          set(taskIsEditingAtomFamily(taskId), false)
          try {
            await registerTask(newTask)
            set(errorMessageAtom, "")
          } catch (error) {
            console.error("Error:", error)
            // エラーが発生した場合、状態を元に戻す
            set(taskAtomFamily(taskId), currentTask)
            set(errorMessageAtom, "Failed to register task.")
          }
        } else {
          set(taskIsEditingAtomFamily(taskId), true)
        }
      },
      [taskId, isEditing],
    ),
  )

  /**
   * タスクの編集状態を切り替える
   * 編集中の場合、更新処理を行う
   * 更新処理が成功した場合、編集状態を解除する
   */
  const handleUpdateTask = useAtomCallback(
    useCallback(
      async (get, set) => {
        if (isEditing) {
          const currentTask = get(taskAtomFamily(taskId))
          if (currentTask.title === "") {
            set(errorMessageAtom, "Title is required.")
            return
          }
          const updatedTask: Task = {
            ...currentTask,
            updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          }

          // Atomを更新
          set(taskAtomFamily(taskId), updatedTask)
          set(taskIsEditingAtomFamily(taskId), false)

          try {
            // 更新されたタスクを使用して非同期操作を実行
            await updateTask(taskId, updatedTask)
            set(errorMessageAtom, "")
          } catch (error) {
            console.error("Error:", error)
            // エラーが発生した場合、状態を元に戻す
            set(taskAtomFamily(taskId), currentTask)
            set(errorMessageAtom, "Failed to update task.")
          }
        } else {
          set(taskIsEditingAtomFamily(taskId), true)
        }
      },
      [taskId, isEditing],
    ),
  )

  /**
   *  タスクを削除する
   */
  const handleRemoveTask = useAtomCallback(
    useCallback(
      async (get, set) => {
        const currentTask = get(taskAtomFamily(taskId))
        if (currentTask.status === "new") {
          // 新規登録中のタスクは削除するだけでよい
          set(
            taskIdsAtom,
            taskIds.filter((id) => id !== taskId),
          )
          return
        }
        const removedTask: Task = {
          ...currentTask,
          status: "gone",
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        }

        // Atomを更新
        set(
          taskIdsAtom,
          taskIds.filter((id) => id !== taskId),
        )
        set(taskAtomFamily(taskId), removedTask)
        set(errorMessageAtom, "")

        try {
          // 更新されたタスクを使用して非同期操作を実行
          await updateTask(taskId, removedTask)
        } catch (error) {
          console.error("Failed to remove task:", error)
          // エラーが発生した場合、状態を元に戻す
          set(taskIdsAtom, [...taskIds, taskId])
          set(taskAtomFamily(taskId), currentTask)
          set(errorMessageAtom, "Failed to remove task.")
        }
      },
      [taskId, taskIds],
    ),
  )
  return {
    taskIds,
    task,
    isEditing,
    handleRegisterTask,
    handleUpdateTask,
    handleRemoveTask,
  }
}
