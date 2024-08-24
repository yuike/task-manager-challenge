import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { updateTask } from "@/services/updateTask"
import type { Task } from "@/types/Task"
import dayjs from "dayjs"
import { useAtom, useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback } from "react"

export const useButtons = (taskId: number) => {
  const isEditing = useAtomValue(taskIsEditingAtomFamily(taskId))
  const taskIds = useAtomValue(taskIdsAtom)
  const task = useAtomValue(taskAtomFamily(taskId))

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
          } catch (error) {
            console.error("Failed to update task:", error)
            // エラーが発生した場合、状態を元に戻す
            set(taskAtomFamily(taskId), currentTask)
            // TODO: ユーザーにエラーを通知する
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

        try {
          // 更新されたタスクを使用して非同期操作を実行
          await updateTask(taskId, removedTask)
        } catch (error) {
          console.error("Failed to update task:", error)
          // エラーが発生した場合、状態を元に戻す
          set(taskIdsAtom, [...taskIds, taskId])
          set(taskAtomFamily(taskId), currentTask)
          // TODO: ユーザーにエラーを通知する
        }
      },
      [taskId, taskIds],
    ),
  )
  return {
    taskIds,
    task,
    isEditing,
    handleUpdateTask,
    handleRemoveTask,
  }
}
