import { IconButton } from "@/components/IconButton"
import IconCheck from "@/icons/IconCheck"
import IconPencil from "@/icons/IconPencil"
import IconTrash from "@/icons/IconTrash"
import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { atom, useAtom, useSetAtom } from "jotai"
import type { FC } from "react"

export const Buttons: FC<{ taskId: number }> = ({ taskId }) => {
  const [isEditing, setIsEditing] = useAtom(taskIsEditingAtomFamily(taskId))
  const [task] = useAtom(taskAtomFamily(taskId))
  const removeTask = useSetAtom(
    atom(null, (get, set) => {
      const taskIds = get(taskIdsAtom)
      set(
        taskIdsAtom,
        taskIds.filter((id) => id !== taskId),
      )
    }),
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
        onClick={() => setIsEditing(!isEditing)}
        disabled={task.status === "done"}
      />
      <IconButton
        variant="danger"
        icon={<IconTrash aria-label="Remove" />}
        onClick={removeTask}
      />
    </div>
  )
}
