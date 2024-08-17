import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { InputText } from "./InputText"

const meta = {
  title: "TaskManager/TaskCard/InputText",
  component: InputText,
} satisfies Meta<typeof InputText>

export default meta
type Story = StoryObj<typeof InputText>

interface ComponentWithJotaiProps
  extends React.ComponentProps<typeof InputText> {
  field: keyof Pick<Task, "title" | "description">
  size: "md" | "lg" | undefined
  overrides?: Partial<Task>
  isEditing?: boolean
}

const ComponentWithJotai = ({
  taskId,
  field = "title",
  size = "md",
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
      <InputText taskId={taskId} field={field} size={size} />
    </Provider>
  )
}

export const Default: Story = {
  args: {
    taskId: 1,
    field: "title",
    size: "md",
    defaultText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
}

export const Large: Story = {
  args: {
    taskId: 1,
    field: "title",
    size: "lg",
    defaultText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
}

export const IsEditing: Story = {
  render: (args) => (
    <ComponentWithJotai
      {...args}
      isEditing={true}
      field="description"
      size="md"
    />
  ),
  args: {
    taskId: 1,
    name: "dummy",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox")
    await userEvent.type(
      input,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    )
  },
}

export const IsEditingLarge: Story = {
  render: (args) => (
    <ComponentWithJotai {...args} isEditing={true} field="title" size="lg" />
  ),
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
