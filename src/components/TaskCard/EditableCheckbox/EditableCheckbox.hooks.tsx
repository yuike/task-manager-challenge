import {
  errorMessageAtom,
  taskAtomFamily,
  taskIsCheckedAtomFamily,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { updateTask } from "@/services/updateTask"
import type { Task } from "@/types/Task"
import dayjs from "dayjs"
import { useAtomValue, useSetAtom } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { type ChangeEvent, useCallback } from "react"

export const useEditableCheckbox = (taskId: number) => {
  const setIsChecked = useSetAtom(taskIsCheckedAtomFamily(taskId))
  const isEditing = useAtomValue(taskIsEditingAtomFamily(taskId))
  const task = useAtomValue(taskAtomFamily(taskId))
  const handleUpdateTask = useAtomCallback(
    useCallback(
      async (get, set) => {
        const currentTask = get(taskAtomFamily(taskId))
        const isChecked = get(taskIsCheckedAtomFamily(taskId))
        const updatedTask: Task = {
          ...currentTask,
          status: isChecked ? "done" : "todo",
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        }

        // Atomを更新
        set(taskAtomFamily(taskId), updatedTask)

        try {
          // 更新されたタスクを使用して非同期操作を実行
          await updateTask(taskId, updatedTask)
        } catch (error) {
          console.error("Failed to update task:", error)
          // エラーが発生した場合、状態を元に戻す
          set(taskAtomFamily(taskId), currentTask)
          set(errorMessageAtom, "Failed to update task.")
        }
      },
      [taskId],
    ),
  )

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
    handleUpdateTask()
  }

  return {
    isEditing,
    task,
    handleCheckboxChange,
  }
}
