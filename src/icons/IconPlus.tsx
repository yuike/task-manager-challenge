import type { SVGProps } from "react"

const IconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    role="img"
    aria-label="追加"
    {...props}
  >
    <path
      d="M4.2 10h11.7M10 4.2v11.7"
      className="Plus_svg__cls-1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)
export default IconPlus
