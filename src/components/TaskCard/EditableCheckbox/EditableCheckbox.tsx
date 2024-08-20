import IconCheck from "@/icons/IconCheck"
import { taskAtomFamily, taskIsEditingAtomFamily } from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import { useAtom } from "jotai"
import type { ChangeEvent, ComponentProps, FC } from "react"
import { InputText } from "../InputText"
import { getTaskCompletionStyle } from "../styles"

interface Props extends Omit<ComponentProps<"input">, "className"> {
  taskId: number
  name: string
}

export const EditableCheckbox: FC<Props> = ({ taskId, name, ...props }) => {
  const [isEditing] = useAtom(taskIsEditingAtomFamily(taskId))
  const [task, setTask] = useAtom(taskAtomFamily(taskId))
  const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setTask((prev): Task => {
      return {
        ...prev,
        status: event.target.checked ? "done" : "todo",
      }
    })
  }

  return (
    <label
      className={`relative flex items-center hover:cursor-pointer hover:opacity-50 ${getTaskCompletionStyle(taskId)}`}
    >
      <input
        type="checkbox"
        className="peer appearance-none"
        disabled={isEditing}
        onChange={changeStatus}
        checked={task.status === "done"}
        {...props}
      />
      <span
        className={`mr-4 block h-4 w-4 overflow-clip border border-black text-white transition ease-in-out peer-checked:bg-black ${isEditing ? "peer-disabled:border-gray-200 peer-disabled:bg-gray-50 peer-disabled:text-gray-50" : ""}`}
      >
        <IconCheck />
      </span>
      <InputText
        taskId={taskId}
        field="title"
        size="lg"
        defaultText="Untitled task"
        aria-label="Title"
      />
    </label>
  )
}
