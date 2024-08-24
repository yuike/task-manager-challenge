import type { Meta, StoryObj } from "@storybook/react"
import { TaskFrame } from "./TaskFrame"

const meta = {
  title: "TaskManager/TaskCard/TaskFrame",
  component: TaskFrame,
} satisfies Meta<typeof TaskFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div>frame</div>,
  },
}
