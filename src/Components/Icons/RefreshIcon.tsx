import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const RefreshIcon = ({width, height, color, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 24)/24:'24')}
    height={!!height ? height : (!!width? (width * 24)/24:'24')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{...style}}
    className={className}
  >
    <path stroke={!!color ? color : '#f3f3f3'} strokeWidth={2} d="m14 15-4 4 4 4" />
    <path
      stroke={!!color ? color : '#f3f3f3'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M18.062 8.5A7 7 0 0 1 12 19"
    />
    <path stroke={!!color ? color : '#f3f3f3'} strokeWidth={2} d="m10 9 4-4-4-4" />
    <path
      stroke={!!color ? color : '#f3f3f3'}
      strokeLinecap="round"
      strokeWidth={2}
      d="M5.938 15.5A7 7 0 0 1 12 5"
    />
  </svg>
)

export default RefreshIcon
