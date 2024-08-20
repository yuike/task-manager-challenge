import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/test"
import { Provider } from "jotai"
import { Radio } from "./Radio"

const meta = {
  title: "TaskManager/TaskCard/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider>
      <Radio {...args} />
    </Provider>
  ),
  args: {
    label: "3 days later",
    name: "due",
    value: "3",
  },
}

export const Selected: Story = {
  ...Default,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const radio = canvas.getByRole("radio", { name: "3 days later" })
    await userEvent.click(radio)
  },
}
