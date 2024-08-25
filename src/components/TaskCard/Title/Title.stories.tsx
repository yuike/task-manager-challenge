import type { Meta, StoryObj } from "@storybook/react"
import { Provider } from "jotai"
import { Title } from "./Title"

const meta = {
  title: "TaskManager/TaskCard/Title",
  component: Title,
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider>
      <Title {...args} />
    </Provider>
  ),
  args: {
    taskId: 1,
    title: "dummy title",
  },
}
