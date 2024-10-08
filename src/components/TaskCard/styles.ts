import { taskAtomFamily } from "@/libs/jotai/atoms"
import { useAtom } from "jotai"

export const getTaskCompletionStyle = (taskId: number) => {
  const [task] = useAtom(taskAtomFamily(taskId))

  return task.status === "done" ? "opacity-20" : ""
}
