import type { SVGProps } from "react"

const IconCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="1em"
    height="1em"
    fill="none"
    role="img"
    aria-label="カレンダー"
    {...props}
  >
    <path
      fill="currentColor"
      d="M15.8 2.3h-1.5v-.7c0-.6-.4-1-1-1s-1 .4-1 1v.7H7.6v-.7c0-.6-.4-1-1-1s-1 .4-1 1v.7H4.1C2.6 2.3 1.4 3.5 1.4 5v11.7c0 1.5 1.2 2.7 2.7 2.7h11.7c1.5 0 2.7-1.2 2.7-2.7V5c0-1.5-1.2-2.7-2.7-2.7m-11.6 2h1.5V5c0 .6.4 1 1 1s1-.4 1-1v-.7h4.7V5c0 .6.4 1 1 1s1-.4 1-1v-.7h1.5c.4 0 .7.3.7.7v2.3H3.5V5c0-.4.3-.7.7-.7m11.6 13H4.2c-.4 0-.7-.3-.7-.7V9.3h13v7.3c0 .4-.3.7-.7.7"
    />
  </svg>
)
export default IconCalendar
