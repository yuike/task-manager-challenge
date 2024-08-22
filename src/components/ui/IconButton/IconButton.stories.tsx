import IconPencil from "@/icons/IconPencil"
import type { Meta, StoryObj } from "@storybook/react"
import { fn, userEvent, within } from "@storybook/test"
import { IconButton } from "./IconButton"

const meta = {
  title: "TaskManager/IconButton",
  component: IconButton,
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    icon: <IconPencil />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.hover(button)
  },
}
export const Confirm: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: "confirm",
  },
}

export const Danger: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: "danger",
  },
}
