import { type ComponentProps, type FC, useId } from "react"
import { getTaskCompletionStyle } from "../styles"

interface Props extends Omit<ComponentProps<"input">, "className"> {
  label: string
  name: string
  value: string
}

export const Radio: FC<Props> = ({ label, name, ...props }) => {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className={`rounded-xl bg-gray-100 px-4 py-1 text-xs transition ease-in-out hover:cursor-pointer hover:opacity-50 has-[:checked]:bg-black has-[:checked]:text-white ${getTaskCompletionStyle}`}
    >
      <input
        type="radio"
        name={name}
        id={id}
        className="appearance-none"
        {...props}
      />
      <span className="">{label}</span>
    </label>
  )
}
