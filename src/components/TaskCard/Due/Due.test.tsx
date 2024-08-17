import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import * as stories from "./Due.stories"

const { Default, IsEditing } = composeStories(stories)

describe("<Due />", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      toFake: ["Date"],
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  test("3つの選択肢が表示されていること", async () => {
    render(<IsEditing />)
    expect(
      screen.getByRole("radio", { name: "1 day later" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("radio", { name: "3 days later" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("radio", { name: "1 week later" }),
    ).toBeInTheDocument()
  })

  test("「1 day later」をクリックすると、deadlineが1日後に設定されること", async () => {
    vi.setSystemTime(new Date("2024-01-02 13:00:00"))
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "dummy",
      deadline: "",
      status: "todo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    const beforeTask = store.get(taskAtomFamily(1))
    expect(beforeTask.deadline).toEqual("")
    const oneDayLater = screen.getByRole("radio", { name: "1 day later" })
    await userEvent.click(oneDayLater)
    const afterTask = store.get(taskAtomFamily(1))
    expect(afterTask.deadline).toEqual("2024-01-03")
  })
  test("「3 days later」をクリックすると、deadlineが3日後に設定されること", async () => {
    vi.setSystemTime(new Date("2024-01-02 13:00:00"))
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "dummy",
      deadline: "",
      status: "todo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    const beforeTask = store.get(taskAtomFamily(1))
    expect(beforeTask.deadline).toEqual("")
    const oneDayLater = screen.getByRole("radio", { name: "3 days later" })
    await userEvent.click(oneDayLater)
    const afterTask = store.get(taskAtomFamily(1))
    expect(afterTask.deadline).toEqual("2024-01-05")
  })
  test("「1 week later」をクリックすると、deadlineが7日後に設定されること", async () => {
    vi.setSystemTime(new Date("2024-01-02 13:00:00"))
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "dummy",
      deadline: "",
      status: "todo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    const beforeTask = store.get(taskAtomFamily(1))
    expect(beforeTask.deadline).toEqual("")
    const oneDayLater = screen.getByRole("radio", { name: "1 week later" })
    await userEvent.click(oneDayLater)
    const afterTask = store.get(taskAtomFamily(1))
    expect(afterTask.deadline).toEqual("2024-01-09")
  })
})
