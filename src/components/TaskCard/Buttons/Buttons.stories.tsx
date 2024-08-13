import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { Provider, createStore } from "jotai"
import { Buttons } from "./Buttons"

const meta = {
  title: "TaskManager/TaskCard/Buttons",
  component: Buttons,
} satisfies Meta<typeof Buttons>

export default meta
type Story = StoryObj<typeof Buttons>

interface ComponentWithJotaiProps extends React.ComponentProps<typeof Buttons> {
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
      <Buttons taskId={taskId} />
    </Provider>
  )
}

export const Default: Story = {
  args: {
    taskId: 1,
  },
}

export const IsEditing: Story = {
  render: (args) => <ComponentWithJotai {...args} isEditing={true} />,
  args: {
    taskId: 1,
  },
}

export const IsDone: Story = {
  render: (args) => (
    <ComponentWithJotai {...args} overrides={{ status: "done" }} />
  ),
  args: {
    taskId: 1,
  },
}
