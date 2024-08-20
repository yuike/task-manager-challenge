import type { Preview } from "@storybook/react"
import { Inter } from "next/font/google"
import "../src/app/globals.css"
import React from "react"

const inter = Inter({ weight: ["600", "700"], subsets: ["latin"] })

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <div className={inter.className}>
          <Story />
        </div>
      )
    },
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
