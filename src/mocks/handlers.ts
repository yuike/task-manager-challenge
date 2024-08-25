import type { Task } from "@/types/Task"
import { http, HttpResponse, type StrictResponse } from "msw"

interface CreateTaskBody {
  title: string
  description?: string
}

interface UpdateTaskBody {
  title?: string
  description?: string
  status?: Task["status"]
}

interface ErrorResponse {
  error: {
    message: string
  }
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    status: "todo",
    description: "Description 1",
    createdAt: "2023-01-01 12:00:00",
    updatedAt: "2023-01-01 12:00:00",
  },
  {
    id: 2,
    title: "Task 2",
    status: "inProgress",
    description: "Description 2",
    createdAt: "2023-01-02 12:00:00",
    updatedAt: "2023-01-02 12:00:00",
  },
]

const getNextId = (tasks: Task[]): number =>
  Math.max(...tasks.map((t) => t.id), 0) + 1

const createTask = (tasks: Task[], body: CreateTaskBody): Task => ({
  id: getNextId(tasks),
  title: body.title,
  description: body.description || "",
  status: "todo",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

const updateTask = (task: Task, body: UpdateTaskBody): Task => ({
  ...task,
  title: body.title || task.title,
  description: body.description || task.description,
  status: body.status || task.status,
  updatedAt: new Date().toISOString(),
})

export const handlers = [
  /**
   * タスクの一覧を返します
   * @param {Object} params - リクエストパラメータ
   * @param {string} [params.status] - フィルタリングするタスクのステータス
   * @returns {StrictResponse<{ tasks: Task[] } | ErrorResponse>} タスクの一覧またはエラーレスポンス
   */
  http.get(
    "/api/tasks",
    ({ request }): StrictResponse<{ tasks: Task[] } | ErrorResponse> => {
      const url = new URL(request.url)
      const status = url.searchParams.get("status") as Task["status"] | null
      const filteredTasks = status
        ? initialTasks.filter((task) => task.status === status)
        : initialTasks
      return HttpResponse.json({ tasks: filteredTasks })
    },
  ),

  /**
   * タスクを一件登録します
   * @param {Object} requestBody - リクエストボディ
   * @param {string} requestBody.title - タスクのタイトル（必須）
   * @param {string} [requestBody.description] - タスクの説明
   * @returns {Promise<StrictResponse<{ task: Task } | ErrorResponse>>} 登録されたタスクまたはエラーレスポンス
   */
  http.post(
    "/api/tasks",
    async ({
      request,
    }): Promise<StrictResponse<{ task: Task } | ErrorResponse>> => {
      const body = (await request.json()) as CreateTaskBody
      if (!body.title) {
        return HttpResponse.json(
          { error: { message: "Title is required" } },
          { status: 400 },
        )
      }
      const newTask = createTask(initialTasks, body)
      initialTasks.push(newTask)
      return HttpResponse.json({ task: newTask }, { status: 201 })
    },
  ),

  /**
   * タスクを1件取得します
   * @param {Object} params - URLパラメータ
   * @param {string} params.id - 取得するタスクのID
   * @returns {StrictResponse<{ task: Task } | ErrorResponse>} 指定されたIDのタスクまたはエラーレスポンス
   */
  http.get(
    "/api/tasks/:id",
    ({ params }): StrictResponse<{ task: Task } | ErrorResponse> => {
      const id = Number.parseInt(params.id as string)
      const task = initialTasks.find((t) => t.id === id)
      if (!task) {
        return HttpResponse.json(
          { error: { message: "Task not found" } },
          { status: 404 },
        )
      }
      return HttpResponse.json({ task }, { status: 200 })
    },
  ),

  /**
   * タスクを1件更新します
   * @param {Object} params - URLパラメータ
   * @param {string} params.id - 更新するタスクのID
   * @param {Object} requestBody - リクエストボディ
   * @param {string} [requestBody.title] - 更新するタスクのタイトル
   * @param {string} [requestBody.description] - 更新するタスクの説明
   * @param {TaskStatus} [requestBody.status] - 更新するタスクのステータス
   * @param {string} [requestBody.deadline] - 更新するタスクの締め切り
   * @returns {Promise<StrictResponse<Task | ErrorResponse>>} 更新されたタスクまたはエラーレスポンス
   */
  http.put(
    "/api/tasks/:id",
    async ({
      params,
      request,
    }): Promise<StrictResponse<Task | ErrorResponse>> => {
      const id = Number.parseInt(params.id as string)
      const body = (await request.json()) as UpdateTaskBody
      const taskIndex = initialTasks.findIndex((t) => t.id === id)
      if (taskIndex === -1) {
        return HttpResponse.json(
          { error: { message: "Task not found" } },
          { status: 404 },
        )
      }
      const updatedTask = updateTask(initialTasks[taskIndex], body)
      initialTasks[taskIndex] = updatedTask
      return HttpResponse.json(updatedTask)
    },
  ),
]
