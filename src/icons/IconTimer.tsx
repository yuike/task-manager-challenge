import type { SVGProps } from "react"

const IconTimer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    role="img"
    aria-label="ストップウォッチ"
    {...props}
  >
    <defs>
      <style>
        {
          ".Timer_svg__cls-2{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <g>
      <path
        d="M1 1h20v20H1z"
        style={{
          fill: "none",
        }}
      />
      <path
        fill="none"
        stroke="currentColor"
        d="M9 1h4M11 13l3-3M11 21c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8"
        className="Timer_svg__cls-2"
      />
    </g>
  </svg>
)
export default IconTimer
