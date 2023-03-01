import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const SunIcon = ({width, height, color, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 24)/24:'24')}
    height={!!height ? height : (!!width? (width * 24)/24:'24')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{...style}}
    className={className}
  >
    <circle cx={12} cy={12} r={4} fill={!!color ? color : '#153F67'} />
    <path
      d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364 7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636 7.05 7.05"
      stroke={!!color ? color : '#153F67'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)

export default SunIcon
