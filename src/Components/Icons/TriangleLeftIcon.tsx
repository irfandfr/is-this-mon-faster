import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const TriangleLeftIcon = ({width, height, color, style, className} : Props) => (
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
      d="m7.293 11.795 8.448-5.914A.8.8 0 0 1 17 6.537v10.927a.8.8 0 0 1-1.259.655l-8.448-5.914a.25.25 0 0 1 0-.41Z"
      fill={!!color ? color : '#CCD2E3'}
    />
  </svg>
)

export default TriangleLeftIcon
