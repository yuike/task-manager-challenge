import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { http, HttpResponse } from "msw"
import { TaskList } from "./TaskList"

const meta = {
  title: "TaskManager/TaskList",
  component: TaskList,
  decorators: [
    (Story: typeof TaskList) => {
      return (
        // INFO: Add Taskボタン付きでテストしたかったためスタイリングをしているが、本番相当のデザインではないことに注意
        <div className="mt-24">
          <Story />
        </div>
      )
    },
  ],
} satisfies Meta<typeof TaskList>

export default meta
type Story = StoryObj<typeof meta>

const store = createStore()

export const Default: Story = {
  render: () => (
    <Provider>
      <TaskList />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tasks", () => {
          return HttpResponse.json({
            tasks: [],
          })
        }),
      ],
    },
  },
}
export const Fetched: Story = {
  render: () => (
    <Provider store={store}>
      <TaskList />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tasks", () => {
          return HttpResponse.json({
            tasks: [
              {
                id: 1,
                title: "ポラーノの広場",
                status: "todo",
                deadline: "2025-01-01",
                description:
                  "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
                createdAt: "2023-01-01 12:00:00",
                updatedAt: "2023-01-01 12:00:00",
              },
              {
                id: 2,
                title: "Lorem ipsum dolor sit amet",
                status: "done",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                deadline: "2025-01-01",
                createdAt: "2023-01-02 12:00:00",
                updatedAt: "2023-01-02 12:00:00",
              },
            ],
          })
        }),
      ],
    },
  },
}

export const Add: Story = {
  render: () => (
    <Provider>
      <TaskList />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tasks", () => {
          return HttpResponse.json({
            tasks: [],
          })
        }),
        http.post("/api/tasks", async () => {
          return HttpResponse.json({
            status: 201,
            message: "success",
          })
        }),
      ],
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const add = await canvas.findByRole("button", { name: "追加 Add Task" })
    await userEvent.click(add)
    const edit = canvas.getByRole("button", { name: "Edit" })
    await userEvent.click(edit)
    const title = canvas.getByRole("textbox", { name: "Title" })
    await userEvent.clear(title)
    await userEvent.type(title, "ポラーノの広場")
    const description = canvas.getByRole("textbox", { name: "Description" })
    await userEvent.clear(description)
    await userEvent.type(
      description,
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
    const due = canvas.getByRole("radio", { name: "3 days later" })
    await userEvent.click(due)
    const done = canvas.getByRole("button", { name: "Done" })
    await userEvent.click(done)
  },
}

export const FailedToRegister: Story = {
  render: () => (
    <Provider>
      <TaskList />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tasks", () => {
          return HttpResponse.json({
            tasks: [],
          })
        }),
        http.post("/api/tasks", async () => {
          return new HttpResponse("Service Unavailable", { status: 503 })
        }),
      ],
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const add = await canvas.findByRole("button", { name: "追加 Add Task" })
    await userEvent.click(add)
    const edit = canvas.getByRole("button", { name: "Edit" })
    await userEvent.click(edit)
    const title = canvas.getByRole("textbox", { name: "Title" })
    await userEvent.clear(title)
    await userEvent.type(title, "ポラーノの広場")
    const description = canvas.getByRole("textbox", { name: "Description" })
    await userEvent.clear(description)
    await userEvent.type(
      description,
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
    const due = canvas.getByRole("radio", { name: "3 days later" })
    await userEvent.click(due)
    const done = canvas.getByRole("button", { name: "Done" })
    await userEvent.click(done)
  },
}

export const FailedToUpdate: Story = {
  render: () => (
    <Provider>
      <TaskList />
    </Provider>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get("/api/tasks", () => {
          return HttpResponse.json({
            tasks: [
              {
                id: 1,
                title: "ポラーノの広場",
                status: "todo",
                deadline: "2025-01-01",
                description:
                  "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
                createdAt: "2023-01-01 12:00:00",
                updatedAt: "2023-01-01 12:00:00",
              },
            ],
          })
        }),
        http.put("/api/tasks/:id", async () => {
          return new HttpResponse("Service Unavailable", { status: 503 })
        }),
      ],
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const edit = await canvas.findByRole("button", { name: "Edit" })
    await userEvent.click(edit)
    const title = canvas.getByRole("textbox", { name: "Title" })
    await userEvent.clear(title)
    await userEvent.type(title, "Update失敗タスク")
    const description = canvas.getByRole("textbox", { name: "Description" })
    await userEvent.clear(description)
    await userEvent.type(description, "will be failed")
    const due = canvas.getByRole("radio", { name: "3 days later" })
    await userEvent.click(due)
    const done = canvas.getByRole("button", { name: "Done" })
    await userEvent.click(done)
  },
}

// export const Done: Story = {
//   ...Default,
//   play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
//     const canvas = within(canvasElement)
//     const button = canvas.getByRole("button", { name: "Edit" })
//     await userEvent.click(button)
//     const title = canvas.getByRole("textbox", { name: "Title" })
//     await userEvent.type(title, "ポラーノの広場")
//     const description = canvas.getByRole("textbox", { name: "Description" })
//     await userEvent.type(
//       description,
//       "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
//     )
//     const due = canvas.getByRole("radio", { name: "3 days later" })
//     await userEvent.click(due)
//     const done = canvas.getByRole("button", { name: "Done" })
//     await userEvent.click(done)
//     const checkbox = canvas.getByRole("checkbox")
//     await userEvent.click(checkbox)
//   },
// }
