import type { Task } from "@/types/Task"
import type { TaskAtom } from "@/types/TaskAtom"
import { atom } from "jotai"
import { atomFamily } from "jotai/utils"

export const taskIdsAtom = atom<number[]>([])

export const taskAtomFamily = atomFamily((id: number) =>
  atom<Task>({
    id: id,
    title: "",
    deadline: "",
    status: "todo",
    description: "",
    createdAt: "",
    updatedAt: "",
  }),
)

export const taskIsEditingAtomFamily = atomFamily((id: number) =>
  atom<boolean>(false),
)
