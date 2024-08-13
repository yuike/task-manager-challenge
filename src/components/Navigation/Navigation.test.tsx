import { composeStories } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import * as stories from "./Navigation.stories"

const { Default } = composeStories(stories)

describe("<Navigation />", () => {
  test("リンク先が正しく設定されていること", async () => {
    render(<Default />)
    const links = screen.getAllByRole("link")
    expect(links[0]).toHaveAttribute("href", "/")
    expect(links[1]).toHaveAttribute("href", "/")
    expect(links[2]).toHaveAttribute("href", "/completed")
  })
})
