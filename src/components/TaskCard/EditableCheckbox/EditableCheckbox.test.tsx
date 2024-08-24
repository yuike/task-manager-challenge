import {
  taskAtomFamily,
  taskIdsAtom,
  taskIsEditingAtomFamily,
} from "@/libs/jotai/atoms"
import { server } from "@/mocks/node"
import * as updateTask from "@/services/updateTask"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { http, HttpResponse } from "msw"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { EditableCheckbox } from "./EditableCheckbox"

describe("<EditableCheckbox />", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      toFake: ["Date"],
    })
    server.use(
      http.put("/api/tasks", () =>
        HttpResponse.json({
          status: 200,
        }),
      ),
    )
  })
  afterEach(() => {
    vi.useRealTimers()
  })
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

  test("チェックボックスにチェックを入れると、statusがdoneになり、updatedAtが現在時刻になること", async () => {
    vi.setSystemTime(new Date("2024-01-01 23:59:59"))
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
    expect(afterTask.updatedAt).toEqual("2024-01-01 23:59:59")
  })

  test("チェックボックスにチェックを入れると、putで送信が行われること", async () => {
    const spy = vi.spyOn(updateTask, "updateTask")
    const user = userEvent.setup()
    const store = createStore()
    store.set(taskIdsAtom, [1])
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "dummy title",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    render(
      <Provider store={store}>
        <EditableCheckbox text="dummy" taskId={1} name="dummy" />
      </Provider>,
    )
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    await user.click(checkbox)
    expect(spy).toHaveBeenCalled()
  })

  // INFO: このテストはInputTextコンポーネントで行う
  test.skip("タイトルを入力すると、そのタイトルでオブジェクトが更新されること", async () => {})
})
