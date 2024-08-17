import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { describe, expect, test } from "vitest"
import * as stories from "./Description.stories"

const { Default } = composeStories(stories)

describe("<Description />", () => {
  test("taskオブジェクトに定義されているdescriptionが表示されていること", async () => {
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
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    const task = store.get(taskAtomFamily(1))
    const description = screen.getByText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    )
    expect(description).toHaveTextContent(task.description)
  })
  test("編集が完了すると、その内容でtaskオブジェクトが更新されること", async () => {
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
    const user = userEvent.setup()
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )
    const beforeTask = store.get(taskAtomFamily(1))
    expect(beforeTask.description).toEqual(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    )
    const input = screen.getByRole("textbox")
    await user.clear(input)
    await user.type(
      input,
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
    const afterTask = store.get(taskAtomFamily(1))
    expect(afterTask.description).toEqual(
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    )
  })
})
