import type { WritableAtom } from "jotai"
import type { Task } from "./Task"

export type TaskAtom = WritableAtom<
  Task | undefined,
  [(prev: Task | undefined) => Task | undefined],
  void
>
