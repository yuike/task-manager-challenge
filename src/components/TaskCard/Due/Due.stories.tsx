import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { Due } from "./Due"

const meta = {
  title: "TaskManager/TaskCard/Due",
  component: Due,
} satisfies Meta<typeof Due>

export default meta
type Story = StoryObj<typeof Due>

interface ComponentWithJotaiProps extends React.ComponentProps<typeof Due> {
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
    title: "dummy",
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
      <Due taskId={taskId} />
    </Provider>
  )
}

export const Default: Story = {
  args: {
    taskId: 1,
  },
}

export const IsEditing: Story = {
  render: () => <ComponentWithJotai taskId={1} isEditing={true} />,
}

export const IsSelecting: Story = {
  ...IsEditing,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("radio", { name: "1 day later" })
    await userEvent.click(input)
  },
}

export const IsEdited: Story = {
  render: () => (
    <ComponentWithJotai taskId={1} overrides={{ deadline: "2024-01-01" }} />
  ),
}
