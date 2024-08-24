"use client"

import { AddButton } from "@/components/AddButton"
import { TaskList } from "@/components/TaskList"
import { Suspense } from "react"
export default function Home() {
  return (
    <section className="mx-4 my-12">
      <h2 className="text-2xl">My Tasks</h2>
      <div className="absolute top-10 right-4">
        <AddButton />
      </div>
      <div className="mt-12">
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList />
        </Suspense>
      </div>
    </section>
  )
}
