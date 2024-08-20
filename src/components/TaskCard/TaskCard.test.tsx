import { taskAtomFamily } from "@/libs/jotai/atoms"
import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { describe, expect, test } from "vitest"
import * as stories from "./TaskCard.stories"

const { Done } = composeStories(stories)

describe("<TaskCard />", () => {
  test.skip("Jotaiへの保存は各コンポーネントでテストしているので省略", async () => {})
  test("タスクの状態がDoneの時、Editボタンは押せないこと", async () => {
    const store = createStore()
    await Done.play?.({
      canvasElement: render(<Done />).container,
    })
    const editButton = screen.getByRole("button", { name: "Edit" })
    expect(editButton).toBeDisabled()
  })
})
