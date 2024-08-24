import { IconButton } from "@/components/ui/IconButton"
import IconCheck from "@/icons/IconCheck"
import IconPencil from "@/icons/IconPencil"
import IconTrash from "@/icons/IconTrash"
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
import { type FC, useCallback } from "react"

export const Buttons: FC<{ taskId: number }> = ({ taskId }) => {
  const [isEditing, setIsEditing] = useAtom(taskIsEditingAtomFamily(taskId))
  const taskIds = useAtomValue(taskIdsAtom)
  const task = useAtomValue(taskAtomFamily(taskId))
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
  return (
    <div className="absolute top-2 right-5 z-20 flex gap-4">
      <IconButton
        variant={isEditing ? "confirm" : "default"}
        icon={
          isEditing ? (
            <IconCheck aria-label="Done" />
          ) : (
            <IconPencil aria-label="Edit" />
          )
        }
        onClick={handleUpdateTask}
        disabled={task.status === "done"}
      />
      <IconButton
        variant="danger"
        icon={<IconTrash aria-label="Remove" />}
        onClick={handleRemoveTask}
      />
    </div>
  )
}
