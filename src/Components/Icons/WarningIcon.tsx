import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const WarningIcon = ({width, height, color, style, className} : Props) => (
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
      d="M17.5 10a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Zm-6.667 3.333a.833.833 0 1 0-1.666 0 .833.833 0 0 0 1.666 0Zm.167-7.5v5H9v-5h2Z"
      fill={!!color ? color : "#FFCA0F"}
    />
  </svg>
)

export default WarningIcon
