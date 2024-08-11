"use client"

import { AddButton } from "@/components/AddButton"
import { TaskCard, TaskCardGroup } from "@/components/TaskCard"
import { taskIdsAtom } from "@/libs/atoms"
import { useAtomValue } from "jotai"

export default function Home() {
  const taskIds = useAtomValue(taskIdsAtom)
  return (
    <section className="mx-4 my-12">
      <h2 className="text-2xl">My Tasks</h2>
      <div className="absolute top-10 right-4">
        <AddButton />
      </div>
      <div className="mt-12">
        <TaskCardGroup>
          {taskIds.map((id) => (
            <TaskCard key={id} taskId={id} />
          ))}
        </TaskCardGroup>
      </div>
    </section>
  )
}
