import type { SVGProps } from "react"

const IconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    role="img"
    aria-label="チェック"
    {...props}
  >
    <path
      d="M18 4 7 15l-5-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)
export default IconCheck
