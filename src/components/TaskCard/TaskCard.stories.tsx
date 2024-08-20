import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { TaskCard } from "./TaskCard"

const meta = {
  title: "TaskManager/TaskCard/TaskCard",
  component: TaskCard,
} satisfies Meta<typeof TaskCard>

export default meta
type Story = StoryObj<typeof meta>

interface ComponentWithJotaiProps
  extends React.ComponentProps<typeof TaskCard> {
  overrides?: Partial<Task>
  isEditing?: boolean
}

const ComponentWithJotai = ({
  taskId,
  overrides = {},
  isEditing = false,
}: ComponentWithJotaiProps) => {
  const store = createStore()
  store.set(taskIdsAtom, [taskId])
  store.set(taskAtomFamily(taskId), {
    id: taskId,
    title: "",
    deadline: "",
    status: "todo",
    description: "",
    createdAt: "2024-01-01 12:00:00",
    updatedAt: "2024-01-01 12:00:00",
    ...overrides,
  })
  store.set(taskIsEditingAtomFamily(1), isEditing)

  return (
    <Provider store={store}>
      <TaskCard taskId={taskId} />
    </Provider>
  )
}

export const Default: Story = {
  render: (args) => <ComponentWithJotai {...args} />,
  args: {
    taskId: 1,
  },
}
export const Edited: Story = {
  ...Default,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Edit" })
    await userEvent.click(button)
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

export const Done: Story = {
  ...Default,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Edit" })
    await userEvent.click(button)
    const title = canvas.getByRole("textbox", { name: "Title" })
    await userEvent.type(title, "ポラーノの広場")
    const description = canvas.getByRole("textbox", { name: "Description" })
    await userEvent.type(
      description,
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
    const due = canvas.getByRole("radio", { name: "3 days later" })
    await userEvent.click(due)
    const done = canvas.getByRole("button", { name: "Done" })
    await userEvent.click(done)
    const checkbox = canvas.getByRole("checkbox")
    await userEvent.click(checkbox)
  },
}
