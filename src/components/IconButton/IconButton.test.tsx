import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import * as stories from "./IconButton.stories"

const { Default } = composeStories(stories)

describe("<Button />", () => {
  test("onClickでeventが発火すること", async () => {
    const onClickFn = vi.fn()
    render(<Default onClick={onClickFn} />)
    const button = screen.getByRole("button")
    button.click()
    expect(onClickFn).toHaveBeenCalledOnce()
  })
})
