import type { FC } from "react"
import { EditableCheckbox } from "../EditableCheckbox"

export const Title: FC<{ taskId: number }> = ({ taskId }) => {
  return <EditableCheckbox taskId={taskId} name="hoge" />
}
