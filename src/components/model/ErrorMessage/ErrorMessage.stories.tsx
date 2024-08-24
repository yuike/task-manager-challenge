import { errorMessageAtom } from "@/libs/jotai/atoms"
import type { Meta, StoryObj } from "@storybook/react"
import { Provider, createStore } from "jotai"
import React from "react"
import { ErrorMessage } from "./ErrorMessage"

const meta = {
  title: "TaskManager/ErrorMessage",
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

const ComponentWithJotai = () => {
  const store = createStore()
  store.set(errorMessageAtom, "Something went wrong.")

  return (
    <Provider store={store}>
      <ErrorMessage />
    </Provider>
  )
}

export const Default: Story = {
  render: () => <ComponentWithJotai />,
}
