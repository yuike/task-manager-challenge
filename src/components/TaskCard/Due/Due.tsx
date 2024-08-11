import IconCalendar from "@/icons/IconCalendar"
import { taskAtomFamily, taskIsEditingAtomFamily } from "@/libs/atoms"
import type { Task } from "@/types/Task"
import dayjs from "dayjs"
import { useAtom } from "jotai"
import type { ChangeEvent, FC } from "react"
import { Radio } from "../Radio"
import { getTaskCompletionStyle } from "../styles"

export const Due: FC<{ taskId: number }> = ({ taskId }) => {
  const [isEditing] = useAtom(taskIsEditingAtomFamily(taskId))
  const [task, setTask] = useAtom(taskAtomFamily(taskId))
  const setDeadline = (event: ChangeEvent<HTMLInputElement>) => {
    setTask((prev): Task => {
      return {
        ...prev,
        deadline: dayjs()
          .add(Number(event.target.value), "day")
          .format("YYYY-MM-DD"),
      }
    })
  }

  return (
    <div className={`ml-4 ${getTaskCompletionStyle(taskId)}`}>
      <fieldset className="flex items-center space-x-4">
        <legend className="contents items-center after:content-[':']">
          <IconCalendar className="mr-2 text-xl" />
          Due
        </legend>
        {isEditing ? (
          <div className="flex gap-1">
            <Radio
              label="1 day later"
              name="due"
              value="1"
              onChange={setDeadline}
            />
            <Radio
              label="3 days later"
              name="due"
              value="3"
              onChange={setDeadline}
            />
            <Radio
              label="1 week later"
              name="due"
              value="7"
              onChange={setDeadline}
            />
          </div>
        ) : (
          <span>{task?.deadline}</span>
        )}
      </fieldset>
    </div>
  )
}
