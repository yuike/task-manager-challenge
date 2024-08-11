"use client"

import IconPlus from "@/icons/IconPlus"
import { taskIdsAtom } from "@/libs/atoms"
import { atom, useSetAtom } from "jotai"
import type { FC } from "react"
import { Button } from "../Button"

export const AddButton: FC = () => {
  const addTaskAtom = atom(null, (get, set) => {
    const taskIds = get(taskIdsAtom)
    const newId = taskIds.length > 0 ? Math.max(...taskIds) + 1 : 1
    set(taskIdsAtom, [...taskIds, newId])
  })
  const addTask = useSetAtom(addTaskAtom)
  return (
    <Button type="button" onClick={addTask}>
      <IconPlus className="text-xl" /> Add Task
    </Button>
  )
}
