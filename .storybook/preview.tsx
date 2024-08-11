import type { Preview } from "@storybook/react"
import "../src/app/globals.css"
import { Provider } from "jotai"
import React from "react"

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
