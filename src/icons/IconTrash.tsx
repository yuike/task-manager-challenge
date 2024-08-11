import type { SVGProps } from "react"

const IconTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    role="img"
    aria-label="ゴミ箱"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.5 4h-3.2v-.7c0-1.4-1.3-2.7-2.7-2.7H8.3C6.9.6 5.6 1.9 5.6 3.3V4H2.4c-.6 0-1 .4-1 1s.4 1 1 1h.7v10.7c0 1.4 1.3 2.7 2.7 2.7h8.3c1.4 0 2.7-1.3 2.7-2.7V6h.7c.6 0 1-.4 1-1s-.4-1-1-1m-9.8-.7c0-.3.4-.7.7-.7h3.3c.3 0 .7.4.7.7V4H7.7zm7.1 13.4c0 .3-.4.7-.7.7H5.8c-.3 0-.7-.4-.7-.7V6h9.7z"
    />
  </svg>
)
export default IconTrash
