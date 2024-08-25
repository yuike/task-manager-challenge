import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import type { Task } from "@/types/Task"
import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider, createStore } from "jotai"
import { Description } from "./Description"

const meta = {
  title: "TaskManager/TaskCard/Description",
  component: Description,
} satisfies Meta<typeof Description>

export default meta
type Story = StoryObj<typeof Description>

interface ComponentWithJotaiProps
  extends React.ComponentProps<typeof Description> {
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2024-01-01 12:00:00",
    updatedAt: "2024-01-01 12:00:00",
    ...overrides,
  })
  store.set(taskIsEditingAtomFamily(1), isEditing)

  return (
    <Provider store={store}>
      <Description text="dummy text" taskId={taskId} />
    </Provider>
  )
}

export const Default: Story = {
  args: {
    taskId: 1,
  },
}

export const IsEdited: Story = {
  render: (args) => <ComponentWithJotai {...args} isEditing={true} />,
  args: {
    taskId: 1,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox")
    await userEvent.clear(input)
    await userEvent.type(
      input,
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
    await userEvent.tab()
  },
}
