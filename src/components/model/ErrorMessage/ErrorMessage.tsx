import { errorMessageAtom } from "@/libs/jotai/atoms"
import { useAtomValue } from "jotai"
import type { FC } from "react"
import React from "react"

// TODO: 複数のエラーメッセージを配列で受け取れるようにする
export const ErrorMessage: FC = () => {
  const message = useAtomValue(errorMessageAtom)
  return (
    <section
      role="alert"
      className="rounded-lg border-2 border-rose-500 px-4 py-6"
    >
      <p className="text-rose-700 text-xs">{message}</p>
    </section>
  )
}
