import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const ParalyzeIcon = ({width, height, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 60)/60:'60')}
    height={!!height ? height : (!!width? (width * 60)/60:'60')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    style={{...style}}
    className={className}
  >
    <path
      d="M17 24.815 26.877 10l-4.939 14.815 4.939 9.876L17 50l4.938-15.309L17 24.815Z"
      fill="#E0B419"
    />
    <path
      d="M24.901 24.815 34.778 10 29.84 24.815l4.938 9.876L24.9 50l4.939-15.309-4.939-9.876Z"
      fill="#E0B419"
    />
    <path
      d="M32.803 24.815 42.678 10l-4.938 14.815 4.938 9.876L32.802 50l4.939-15.309-4.938-9.876Z"
      fill="#E0B419"
    />
  </svg>
)

export default ParalyzeIcon
