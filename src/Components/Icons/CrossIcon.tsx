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
      d="M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0ZM5.252 13.333l.708-.707L8.586 10 5.96 7.374l-.708-.707 1.415-1.415.707.708L10 8.586l2.626-2.626.707-.708 1.415 1.415-.708.707L11.414 10l2.626 2.626.708.707-1.415 1.415-.707-.708L10 11.414 7.374 14.04l-.707.708-1.415-1.415Z"
      clipRule="evenodd"
      fill={!!color ? color : "#EA526F"}
    />
  </svg>
)

export default CrossIcon
