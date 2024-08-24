import type { FC } from "react"
import { InputText } from "../InputText"

interface Props {
  taskId: number
  text: string
}
export const Description: FC<Props> = ({ taskId, text }) => {
  return (
    <InputText
      taskId={taskId}
      field="description"
      defaultText={text}
      placeholder="input description..."
      aria-label="Description"
    />
  )
}
