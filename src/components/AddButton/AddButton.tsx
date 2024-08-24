"use client"

import { Button } from "@/components/ui/Button"
import IconPlus from "@/icons/IconPlus"
import type { FC } from "react"
import { useAddTask } from "./AddButton.hooks"

export const AddButton: FC = () => {
  const { addTask } = useAddTask()
  return (
    <Button type="button" onClick={addTask}>
      <IconPlus className="text-xl" /> Add Task
    </Button>
  )
}
