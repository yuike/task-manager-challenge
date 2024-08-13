import { taskAtomFamily, taskIsEditingAtomFamily } from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import { useAtom } from "jotai"
import type { ChangeEvent, ComponentProps, FC } from "react"
import { getTaskCompletionStyle } from "../styles"

type TaskField = keyof Pick<Task, "title" | "description">

// INFO: sizeはinput type="text"のsizeを指定するのに使用するが、このコンポーネントの仕様上使うことはなく、別の用途に使うためOmitする。
interface Props extends Omit<ComponentProps<"input">, "className" | "size"> {
  taskId: number
  field: TaskField
  defaultText?: string
  size?: "md" | "lg" | undefined
}

export const InputText: FC<Props> = ({
  taskId,
  field,
  defaultText = "",
  size = "md",
  ...props
}) => {
  const [isEditing] = useAtom(taskIsEditingAtomFamily(taskId))
  const [task, setTask] = useAtom(taskAtomFamily(taskId))
  const inputSize = {
    md: "px-2 py-1 rounded-lg",
    lg: "px-4 py-1 rounded-full",
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask((prev): Task => {
      return {
        ...prev,
        [field]: event.target.value,
      }
    })
  }
  return (
    <div className={`relative ${getTaskCompletionStyle(taskId)}`}>
      <input
        type="text"
        className={`w-full bg-gray-200 text-gray-500 transition ease-in-out focus:outline-none focus:ring focus:ring-black ${inputSize[size]} ${isEditing ? "opacity-100" : "opacity-0 hidden"}`}
        defaultValue={task.description}
        onChange={handleChange}
        disabled={!isEditing}
        {...props}
      />
      <span
        className={`peer-checked:text-gray-200 peer-checked:line-through ${isEditing ? "opacity-0 hidden" : "opacity-100"}`}
      >
        {task[field] || defaultText}
      </span>
    </div>
  )
}
