import IconCheck from "@/icons/IconCheck"
import { taskAtomFamily, taskIsEditingAtomFamily } from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import { useAtom } from "jotai"
import type { ChangeEvent, ComponentProps, FC } from "react"
import { InputText } from "../InputText"
import { getTaskCompletionStyle } from "../styles"
import { useEditableCheckbox } from "./EditableCheckbox.hooks"

interface Props extends Omit<ComponentProps<"input">, "className"> {
  taskId: number
  name: string
  text: string
}

export const EditableCheckbox: FC<Props> = ({
  taskId,
  name,
  text,
  ...props
}) => {
  const { isEditing, task, handleCheckboxChange } = useEditableCheckbox(taskId)

  return (
    <label
      className={`relative flex items-center font-bold hover:cursor-pointer hover:opacity-50 ${getTaskCompletionStyle(taskId)}`}
    >
      <input
        type="checkbox"
        className="peer appearance-none"
        disabled={isEditing}
        onChange={handleCheckboxChange}
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
        defaultText={text || "Untitled task"}
        aria-label="Title"
      />
    </label>
  )
}
