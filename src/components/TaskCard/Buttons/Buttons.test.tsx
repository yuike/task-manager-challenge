import { taskIsEditingAtomFamily } from "@/libs/jotai/atoms"
import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { describe, expect, test } from "vitest"
import * as stories from "./Buttons.stories"

const { Default, IsEditing, IsDone } = composeStories(stories)

describe("<Buttons />", () => {
  test("編集ボタンを押すと状態がisEditingに変化すること", async () => {
    const store = createStore()
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    expect(store.get(taskIsEditingAtomFamily(1))).toBe(false)
    const editButton = screen.getByRole("button", { name: "Edit" })
    editButton.click()

    expect(store.get(taskIsEditingAtomFamily(1))).toBe(true)
  })
  test("編集中はアイコンがCheckに変わること", async () => {
    render(<IsEditing />)
    const doneButton = screen.getByRole("button", { name: "Done" })
    expect(doneButton).toBeInTheDocument()
  })
  test("status:'done'の時、編集ボタンは押せないこと", async () => {
    render(<IsDone />)
    const editButton = screen.getByRole("button", { name: "Edit" })
    expect(editButton).toBeDisabled()
  })
})
