import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const CloseIcon = ({width, height, color, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 24)/24:'24')}
    height={!!height ? height : (!!width? (width * 24)/24:'24')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{...style}}
    className={className}
  >
    <path
      d="M18 6 6 18M6 6l12 12"
      stroke={!!color ? color : '#153F67'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CloseIcon
