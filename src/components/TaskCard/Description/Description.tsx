import type { FC } from "react"
import { InputText } from "../InputText"

interface Props {
  taskId: number
}
export const Description: FC<Props> = ({ taskId }) => {
  return (
    <InputText
      taskId={taskId}
      field="description"
      placeholder="input description..."
      aria-label="Description"
    />
  )
}
