import type { Meta, StoryObj } from "@storybook/react"
import { fn, userEvent, within } from "@storybook/test"
import { AddButton } from "./AddButton"

const meta = {
  title: "TaskManager/AddButton",
  component: AddButton,
} satisfies Meta<typeof AddButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Add: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await userEvent.click(button)
  },
}
