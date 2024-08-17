import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { EditableCheckbox } from "./EditableCheckbox"

const meta = {
  title: "TaskManager/TaskCard/EditableCheckbox",
  component: EditableCheckbox,
} satisfies Meta<typeof EditableCheckbox>

export default meta
type Story = StoryObj<typeof EditableCheckbox>

interface ComponentWithJotaiProps
  extends React.ComponentProps<typeof EditableCheckbox> {
  overrides?: Partial<Task>
  isEditing?: boolean
}

const ComponentWithJotai = ({
  taskId,
  name,
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
      <EditableCheckbox taskId={taskId} name="dummy" />
    </Provider>
  )
}

export const Default: Story = {
  render: (args) => <ComponentWithJotai {...args} isEditing={false} />,
  args: {
    taskId: 1,
  },
}

export const Editable: Story = {
  render: (args) => <ComponentWithJotai {...args} isEditing={true} />,
  args: {
    taskId: 1,
    name: "dummy",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox")
    await userEvent.type(input, "Something title")
  },
}
export const Done: Story = {
  render: (args) => (
    <ComponentWithJotai {...args} overrides={{ status: "done" }} />
  ),
  args: {
    taskId: 1,
    name: "dummy",
  },
}
