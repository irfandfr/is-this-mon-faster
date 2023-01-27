import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const CrossIcon = ({width, height, color, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 20)/20:'20')}
    height={!!height ? height : (!!width? (width * 20)/20:'20')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    style={{...style}}
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM3.252 11.333l.708-.707L6.586 8 3.96 5.374l-.708-.707 1.415-1.415.707.708L8 6.586l2.626-2.626.707-.708 1.415 1.415-.708.707L9.414 8l2.626 2.626.708.707-1.415 1.415-.707-.708L8 9.414 5.374 12.04l-.707.708-1.415-1.415Z"
      fill={!!color ? color : "#EA526F"}
    />
  </svg>
)

export default CrossIcon
