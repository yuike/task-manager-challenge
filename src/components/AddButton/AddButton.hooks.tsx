import { taskAtomFamily, taskIdsAtom } from "@/libs/jotai/atoms"
import dayjs from "dayjs"
import { useAtom, useSetAtom } from "jotai"

export const useAddTask = () => {
  const [taskIds, setTaskId] = useAtom(taskIdsAtom)
  const newId = taskIds.length > 0 ? Math.max(...taskIds) + 1 : 1
  const setNewTask = useSetAtom(taskAtomFamily(newId))
  const addTask = () => {
    setTaskId([...taskIds, newId])
    setNewTask({
      id: newId,
      title: "",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    })
  }
  return { addTask }
}
