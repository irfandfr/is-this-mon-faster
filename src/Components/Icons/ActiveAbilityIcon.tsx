import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const ActiveAbilityIcon = ({width, height, style, className} : Props) => (
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
      d="M26.248 20.988 30.423 10v39.996c-14.064.22-21.536-8.57-18.899-15.163 2.637-6.593 8.35-18.68 8.35-18.68l6.374 4.835Z"
      fill="#FF8686"
    />
    <path
      d="m26.383 39.012-9.795-9.893c-.192 1.067-1.903 5.01.576 9.31 1.007 1.746 6.53 2.425 9.22.583Z"
      fill="#F4F4F4"
    />
    <path
      d="M34.43 20.988 30.254 10v39.996c14.065.22 21.537-8.57 18.9-15.163-2.638-6.593-8.351-18.68-8.351-18.68l-6.373 4.835Z"
      fill="#E14242"
    />
    <path
      d="m34.294 39.012 10.203-9.893c.2 1.067 1.983 5.01-.6 9.31-1.048 1.746-6.802 2.425-9.603.583Z"
      fill="#D9D9D9"
    />
  </svg>
)

export default ActiveAbilityIcon
