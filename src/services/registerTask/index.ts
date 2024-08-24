import type { Task } from "@/types/Task"

export const registerTask = async (body: Task): Promise<Task> => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error("Failed to register task")
  }

  return response.json()
}
