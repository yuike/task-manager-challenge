export interface Task {
  id: number
  title: string
  deadline?: string
  // INFO: newは新規作成時のみ使用。OpenAPIの仕様上には存在しないため、書き換える必要あり。
  status: "new" | "todo" | "inProgress" | "done" | "gone"
  description: string
  createdAt: string
  updatedAt: string
}
