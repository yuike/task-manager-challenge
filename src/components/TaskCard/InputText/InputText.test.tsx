import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { describe, expect, test } from "vitest"
import { InputText } from "./InputText"

describe("<InputText />", () => {
  test("fieldがtitleの時、オブジェクトのtitleが更新されること", async () => {
    const user = userEvent.setup()
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <InputText taskId={1} field="title" />
      </Provider>,
    )
    const input = screen.getByRole("textbox")
    await user.type(input, "Something title")
    const task = store.get(taskAtomFamily(1))
    expect(task.title).toEqual("Something title")
  })

  test("fieldがdescriptionの時、オブジェクトのdescriptionが更新されること", async () => {
    const user = userEvent.setup()
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <InputText taskId={1} field="title" />
      </Provider>,
    )
    const input = screen.getByRole("textbox")
    await user.type(input, "Something description")
    const task = store.get(taskAtomFamily(1))
    expect(task.title).toEqual("Something description")
  })
})
