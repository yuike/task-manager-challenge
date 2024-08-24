import { IconButton } from "@/components/ui/IconButton"
import IconCheck from "@/icons/IconCheck"
import IconPencil from "@/icons/IconPencil"
import IconTrash from "@/icons/IconTrash"
import type { FC } from "react"
import { useButtons } from "./Buttons.hooks"

export const Buttons: FC<{ taskId: number }> = ({ taskId }) => {
  const { isEditing, task, handleUpdateTask, handleRemoveTask } =
    useButtons(taskId)
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
