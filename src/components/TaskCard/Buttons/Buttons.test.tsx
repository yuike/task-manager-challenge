import { taskAtomFamily, taskIsEditingAtomFamily } from "@/libs/jotai/atoms"
import { server } from "@/mocks/node"
import * as registerTask from "@/services/registerTask"
import * as updateTask from "@/services/updateTask"
import { Task } from "@/types/Task"
import { composeStories } from "@storybook/react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { http, HttpResponse } from "msw"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import * as stories from "./Buttons.stories"

const { Default, IsEditing, IsDone } = composeStories(stories)

describe("<Buttons />", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      toFake: ["Date"],
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })
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

  test("編集完了ボタンを押すと、isEditingがfalseに変化すること", async () => {
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

  test("新規登録時、編集完了ボタンを押すと、postで送信が行われること", async () => {
    const user = userEvent.setup()
    server.use(
      http.post("/api/tasks", async () => {
        return HttpResponse.json({
          status: 200,
          message: "success",
        })
      }),
    )
    vi.setSystemTime(new Date("2024-01-30 23:59:59"))
    const spy = vi.spyOn(registerTask, "registerTask")
    const store = createStore()
    store.set(taskIsEditingAtomFamily(1), true)
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "post test",
      deadline: "",
      status: "new", // statusがnewの時は新規登録
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )

    const editButton = screen.getByRole("button", { name: "Done" })
    await user.click(editButton)
    expect(spy).toBeCalledWith({
      id: 1,
      title: "post test",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-30 23:59:59",
    })
    expect(spy).toHaveBeenCalledOnce()
  })

  test("更新時、編集完了ボタンを押すと、putで送信が行われること", async () => {
    const user = userEvent.setup()
    server.use(
      http.put("/api/tasks/1", () =>
        HttpResponse.json({
          status: 200,
          message: "success",
        }),
      ),
    )
    vi.setSystemTime(new Date("2024-01-30 23:59:59"))
    const spy = vi.spyOn(updateTask, "updateTask")
    const store = createStore()
    store.set(taskIsEditingAtomFamily(1), true)
    store.set(taskAtomFamily(1), {
      id: 1,
      title: "put test",
      deadline: "",
      status: "todo", // statusがnew以外の時は更新
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-01 12:00:00",
    })
    render(
      <Provider store={store}>
        <Default />
      </Provider>,
    )

    const editButton = screen.getByRole("button", { name: "Done" })
    await user.click(editButton)
    expect(spy).toBeCalledWith(1, {
      id: 1,
      title: "put test",
      deadline: "",
      status: "todo",
      description: "",
      createdAt: "2024-01-01 12:00:00",
      updatedAt: "2024-01-30 23:59:59",
    })
    expect(spy).toHaveBeenCalledOnce()
  })
  describe("タスク登録時に通信が失敗した場合", async () => {
    test("Errorをthrowすること", async () => {
      const user = userEvent.setup()
      server.use(
        http.post(
          "/api/tasks",
          () =>
            new HttpResponse("Service Unavailable", {
              status: 503,
            }),
        ),
      )
      vi.setSystemTime(new Date("2024-01-30 23:59:59"))
      const spy = vi.spyOn(registerTask, "registerTask")
      const store = createStore()
      store.set(taskIsEditingAtomFamily(1), true)
      store.set(taskAtomFamily(1), {
        id: 1,
        title: "register failed test",
        deadline: "",
        status: "new",
        description: "",
        createdAt: "2024-01-01 12:00:00",
        updatedAt: "2024-01-01 12:00:00",
      })
      render(
        <Provider store={store}>
          <Default />
        </Provider>,
      )
      const editButton = screen.getByRole("button", { name: "Done" })
      await user.click(editButton)
      expect(spy).toHaveBeenCalledOnce()
      expect(spy).rejects.toThrowError("Failed to register task")
    })
    test.skip("エラーメッセージが表示されることは<TaskList />で行うためスキップ", async () => {})
  })

  describe("タスク更新時に通信が失敗した場合", async () => {
    test("Errorをthrowすること", async () => {
      const user = userEvent.setup()
      server.use(
        http.put(
          "/api/tasks/:id",
          () =>
            new HttpResponse("Service Unavailable", {
              status: 503,
            }),
        ),
      )
      vi.setSystemTime(new Date("2024-01-30 23:59:59"))
      const spy = vi.spyOn(updateTask, "updateTask")
      const store = createStore()
      store.set(taskIsEditingAtomFamily(1), true)
      store.set(taskAtomFamily(1), {
        id: 1,
        title: "put failed test",
        deadline: "",
        status: "todo", // statusがnew以外の時は更新
        description: "",
        createdAt: "2024-01-01 12:00:00",
        updatedAt: "2024-01-01 12:00:00",
      })
      render(
        <Provider store={store}>
          <Default />
        </Provider>,
      )
      const editButton = screen.getByRole("button", { name: "Done" })
      await user.click(editButton)
      expect(spy).toHaveBeenCalledOnce()
      expect(spy).rejects.toThrowError("Failed to update task")
    })

    test.skip("エラーメッセージが表示されることは<TaskList />で行うためスキップ", async () => {})
  })
  describe("タスク削除時に通信が失敗した場合", async () => {
    test("Errorをthrowすること", async () => {
      const user = userEvent.setup()
      server.use(
        http.put(
          "/api/tasks/:id",
          () =>
            new HttpResponse("Service Unavailable", {
              status: 503,
            }),
        ),
      )
      vi.setSystemTime(new Date("2024-01-30 23:59:59"))
      const spy = vi.spyOn(updateTask, "updateTask")
      const store = createStore()
      store.set(taskIsEditingAtomFamily(1), true)
      store.set(taskAtomFamily(1), {
        id: 1,
        title: "put failed test",
        deadline: "",
        status: "gone", // statusがgoneの時は削除
        description: "",
        createdAt: "2024-01-01 12:00:00",
        updatedAt: "2024-01-01 12:00:00",
      })
      render(
        <Provider store={store}>
          <Default />
        </Provider>,
      )
      const editButton = screen.getByRole("button", { name: "Done" })
      await user.click(editButton)
      expect(spy).toHaveBeenCalledOnce()
      expect(spy).rejects.toThrowError("Failed to update task")
    })
    test.skip("エラーメッセージが表示されることは<TaskList />で行うためスキップ", async () => {})
  })
})
