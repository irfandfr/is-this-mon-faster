import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  color?:string,
  style?: React.CSSProperties
  className?: string
}

const MoonIcon = ({width, height, color, style, className} : Props) => (
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
      d="M11.625 5.01a7 7 0 1 1-3.25 12.98 7 7 0 0 0 3.25-12.98ZM5.4 10.2c.101.304.152.456.203.523a.5.5 0 0 0 .794 0c.05-.067.102-.219.203-.523.082-.245.123-.368.176-.479a2 2 0 0 1 .945-.945c.111-.053.234-.094.479-.176.304-.101.456-.152.523-.203a.5.5 0 0 0 0-.794c-.067-.05-.219-.102-.523-.203-.245-.082-.368-.123-.479-.176a2 2 0 0 1-.945-.945A4.365 4.365 0 0 1 6.6 5.8c-.101-.304-.152-.456-.203-.522a.5.5 0 0 0-.794 0c-.05.066-.102.218-.203.522a4.365 4.365 0 0 1-.176.479 2 2 0 0 1-.945.945A4.365 4.365 0 0 1 3.8 7.4c-.304.101-.456.152-.522.203a.5.5 0 0 0 0 .794c.066.05.218.102.522.203.245.082.368.123.479.176a2 2 0 0 1 .945.945c.053.111.094.234.176.479Z"
      fill={!!color ? color : '#fff'}
    />
  </svg>
)

export default MoonIcon
