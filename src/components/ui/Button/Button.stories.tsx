import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta = {
  title: "TaskManager/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Button",
  },
}
