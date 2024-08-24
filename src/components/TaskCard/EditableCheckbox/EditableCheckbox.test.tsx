import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { describe, expect, test } from "vitest"
import { EditableCheckbox } from "./EditableCheckbox"

describe("<EditableCheckbox />", () => {
  test("編集中はInputTextが表示されること", async () => {
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "",
      deadline: "",
      status: "todo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    store.set(taskIsEditingAtomFamily(1), true)
    render(
      <Provider store={store}>
        <EditableCheckbox text="dummy" taskId={1} name="dummy" />
      </Provider>,
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  test("チェックボックスにチェックを入れると、statusがdoneになること", async () => {
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
    // FIXME: このテストでStorybookのコンポーネント(<Default />)を使うと、テストが失敗する
    render(
      <Provider store={store}>
        <EditableCheckbox text="dummy" taskId={1} name="dummy" />
      </Provider>,
    )
    const beforeTask = store.get(taskAtomFamily(1))
    expect(beforeTask.title).toEqual("")
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    await user.click(checkbox)

    const afterTask = store.get(taskAtomFamily(1))
    expect(afterTask.status).toEqual("done")
  })

  test.todo(
    "チェックボックスにチェックを入れると、status:done, updatedAt:現在時刻になること",
    async () => {},
  )

  // INFO: このテストはInputTextコンポーネントで行う
  test.skip("タイトルを入力すると、そのタイトルでオブジェクトが更新されること", async () => {})
})
