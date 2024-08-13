import { taskAtomFamily, taskIdsAtom } from "@/libs/jotai/atoms"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import * as stories from "./AddButton.stories"

const { Add } = composeStories(stories)

describe("<AddButton />", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      toFake: ["Date"],
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  test("storeに何もない状態でボタンを押すと、task固有のIDがインクリメントされること", async () => {
    const store = createStore()
    await Add.play?.({
      canvasElement: render(
        <Provider store={store}>
          <Add />
        </Provider>,
      ).container,
    })
    const taskIds = store.get(taskIdsAtom)
    expect(taskIds.length).toEqual(1)
    expect(taskIds).toEqual([1])
  })
  test("taskを追加すると、atomFamilyにtaskオブジェクトが初期化されること", async () => {
    vi.setSystemTime(new Date("2024-01-01 12:00:00"))
    const store = createStore()
    await Add.play?.({
      canvasElement: render(
        <Provider store={store}>
          <Add />
        </Provider>,
      ).container,
    })
    const task = store.get(taskAtomFamily(1))
    expect(task.id).toEqual(1)
    expect(task.title).toEqual("")
    expect(task.deadline).toEqual("")
    expect(task.status).toEqual("todo")
    expect(task.description).toEqual("")
    expect(task.createdAt).toEqual("2024-01-01 12:00:00")
    expect(task.createdAt).toEqual("2024-01-01 12:00:00")
  })
})
