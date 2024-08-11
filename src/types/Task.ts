export interface Task {
  id: number
  title: string
  deadline?: string
  status: "todo" | "inProgress" | "done" | "gone"
  description: string
  createdAt: string
  updatedAt: string
}
