import type { Task } from "@/types/Task"
import dayjs from "dayjs"
import { atom } from "jotai"
import { atomFamily } from "jotai/utils"

export const taskIdsAtom = atom<number[]>([])

// TODO: derivedAtomを使ってsetした時、常にupdatedAtを更新するようにする
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

export const errorMessageAtom = atom<string>("")

export const taskIsCheckedAtomFamily = atomFamily((id: number) =>
  atom<boolean>(false),
)
