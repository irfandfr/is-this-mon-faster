import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const TrickRoomIcon = ({width, height, style, className} : Props) => (
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
      d="m13 20 17-10 17 10v20L30 50 13 40V20Z"
      fill="#949CE2"
      fillOpacity={0.5}
      stroke="#B39ACD"
      strokeOpacity={0.8}
      strokeWidth={0.5}
    />
    <path
      d="M30 30 13 40l17 10 17-10-17-10Z"
      fill="#B39ACD"
      fillOpacity={0.8}
      style={{
        mixBlendMode: "multiply",
      }}
    />
    <path
      d="M30 30 13 20v20l17 10V30ZM30 50V30l17-10v20L30 50Z"
      fill="#B39ACD"
      fillOpacity={0.5}
      style={{
        mixBlendMode: "multiply",
      }}
    />
    <path
      d="M30 30v20"
      stroke="#F0E0FF"
      strokeOpacity={0.8}
      strokeWidth={0.5}
      strokeDasharray="1 1"
    />
    <path
      d="M47 20v20M13 20v20M30 10v20M22 15v20M40 16v20"
      stroke="#F0E0FF"
      strokeOpacity={0.8}
      strokeWidth={0.5}
    />
    <path
      d="M22 25v20M40 24v20"
      stroke="#F0E0FF"
      strokeOpacity={0.8}
      strokeWidth={0.5}
      strokeDasharray="1 1"
    />
    <path
      d="m13 40 17.32 10M30 30l17.32 10M30 10l17.32 10M30 21l17.32 10M30 50l17.32-10M13 40l17.32-10M13 20l17.32-10M13 31l17.32-10"
      stroke="#F0E0FF"
      strokeOpacity={0.8}
      strokeWidth={0.5}
    />
    <path
      d="m30 30 17.32-10M30 40l17.32-10M13 20l17.32 10M13 31l17.32 10"
      stroke="#F0E0FF"
      strokeOpacity={0.8}
      strokeWidth={0.5}
      strokeDasharray="1 1"
    />
  </svg>
)

export default TrickRoomIcon
