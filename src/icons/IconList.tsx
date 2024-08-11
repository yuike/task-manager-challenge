import type { SVGProps } from "react"

const IconList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    role="img"
    aria-label="リスト"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#List_svg__a)"
    >
      <path d="M6 4h13M6 10h13M6 16h13M1 4h.01M1 10h.01M1 16h.01" />
    </g>
    <defs>
      <clipPath id="List_svg__a">
        <path d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default IconList
