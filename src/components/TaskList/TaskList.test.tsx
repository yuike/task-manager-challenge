// FIXME: このコンポーネントはStorybookのplayを使うと非常にflakyになるため、playテストは使えない。
// おそらくJotaiとMSWの設定が悪いと考えられるが、今のところはvitest上で操作してテストしている。

import { taskAtomFamily, taskIdsAtom } from "@/libs/jotai/atoms"
import { server } from "@/mocks/node"
import * as registerTask from "@/services/registerTask"
import * as updateTask from "@/services/updateTask"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { http, HttpResponse } from "msw"
import { describe, expect, test, vi } from "vitest"
import { TaskList } from "./TaskList"

describe("<TaskList />", () => {
  test("タスクが登録されていない状態の時、追加ボタンを押すと追加されること", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
    )
    const user = userEvent.setup()
    const store = createStore()
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument()
  })
  test("追加したタスクを登録せず、削除すると通信は実行されないこと。また、画面からは消えること", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
    )
    const user = userEvent.setup()
    const store = createStore()
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    const spy = vi.spyOn(updateTask, "updateTask")
    const removeButton = screen.getByRole("button", { name: "Remove" })
    await user.click(removeButton)
    expect(spy).not.toHaveBeenCalled()
    expect(
      screen.queryByRole("button", { name: "Edit" }),
    ).not.toBeInTheDocument()
  })
  test.skip("追加したタスクを登録すると、通信が実行されること", async () => {
    // Buttonsコンポーネントのテストで実装済みのためskip
  })
  test.skip("登録済みのタスクを、削除すると通信が実行されること", async () => {
    // Buttonsコンポーネントのテストで実装済みのためskip
  })
  test("タイトルを入力していない状態で編集完了しようとするとエラーメッセージが表示されること", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
    )
    const user = userEvent.setup()
    const store = createStore()
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    const editButton = screen.getByRole("button", { name: "Edit" })
    await user.click(editButton)
    const title = screen.getByRole("textbox", { name: "Title" })
    await user.clear(title)
    const doneButton = screen.getByRole("button", { name: "Done" })
    await user.click(doneButton)

    expect(screen.getByText("Title is required.")).toBeInTheDocument()
  })
  test("タスク登録時に通信が失敗した場合,エラーメッセージが表示されること", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
      http.post("/api/tasks", async () => {
        return new HttpResponse("Service Unavailable", { status: 503 })
      }),
    )
    const user = userEvent.setup()
    const spy = vi.spyOn(registerTask, "registerTask")
    render(
      <Provider>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    const editButton = screen.getByRole("button", { name: "Edit" })
    await user.click(editButton)
    const title = screen.getByRole("textbox", { name: "Title" })
    await user.clear(title)
    await user.type(title, "ポラーノの広場")
    const doneButton = screen.getByRole("button", { name: "Done" })
    await user.click(doneButton)
    const errorMessage = await screen.findByText("Failed to register task.")
    expect(spy).toHaveBeenCalledOnce()
    expect(errorMessage).toBeInTheDocument()
  })

  test("タスク更新時に通信が失敗した場合、エラーメッセージが表示されること", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
      http.post("/api/tasks", async () => {
        return HttpResponse.json({
          status: 200,
          messsage: "success",
        })
      }),
      http.put("/api/tasks/:id", async () => {
        return new HttpResponse("Service Unavailable", { status: 503 })
      }),
    )
    const user = userEvent.setup()
    const spy = vi.spyOn(updateTask, "updateTask")
    render(
      <Provider>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    const editButton = await screen.findByRole("button", { name: "Edit" })
    await user.click(editButton)
    const title = screen.getByRole("textbox", { name: "Title" })
    await user.clear(title)
    await user.type(title, "ポラーノの広場")
    const doneButton = screen.getByRole("button", { name: "Done" })
    await user.click(doneButton)
    await user.click(editButton)
    await user.clear(title)
    await user.type(title, "我輩は猫である")
    await user.click(doneButton)
    const errorMessage = await screen.findByText("Failed to update task.")
    expect(spy).toHaveBeenCalledOnce()
    expect(errorMessage).toBeInTheDocument()
  })
  test("タスクの状態がDoneの時、Editボタンは押せないこと", async () => {
    server.use(
      http.get("/api/tasks", () => {
        return HttpResponse.json({
          tasks: [],
        })
      }),
    )
    const user = userEvent.setup()
    render(
      <Provider>
        <TaskList />
      </Provider>,
    )
    const addButton = await screen.findByRole("button", {
      name: "追加 Add Task",
    })
    await user.click(addButton)
    const editButton = await screen.findByRole("button", { name: "Edit" })
    await user.click(editButton)
    const title = screen.getByRole("textbox", { name: "Title" })
    await user.clear(title)
    await user.type(title, "ポラーノの広場")
    const doneButton = screen.getByRole("button", { name: "Done" })
    await user.click(doneButton)
    const checkbox = screen.getByRole("checkbox")
    await user.click(checkbox)
    expect(editButton).toBeDisabled()
  })
})
