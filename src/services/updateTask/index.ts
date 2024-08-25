import type { Task } from "@/types/Task"

export const updateTask = async (id: number, body: Task): Promise<Task> => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error("Failed to update task.")
  }

  return response.json()
}
