import type { Meta, StoryObj } from "@storybook/react"
import { Radio } from "./Radio"

const meta = {
  title: "TaskManager/TaskCard/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "3 days later",
    name: "due",
    value: "3",
  },
}
