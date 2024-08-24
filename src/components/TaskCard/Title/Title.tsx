import type { FC } from "react"
import { EditableCheckbox } from "../EditableCheckbox"

export const Title: FC<{ taskId: number; title: string }> = ({
  taskId,
  title,
}) => {
  return <EditableCheckbox taskId={taskId} name="hoge" text={title} />
}
