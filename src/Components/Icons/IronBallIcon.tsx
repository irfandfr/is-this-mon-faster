import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const IronBallIcon = ({width, height, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 60)/60:'60')}
    height={!!height ? height : (!!width? (width * 60)/60:'60')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    style={{...style}}
    className={className}
  >
    <circle
      cx={30.5}
      cy={30.5}
      r={12.75}
      fill="#146B56"
      stroke="#73897C"
      strokeWidth={1.5}
    />
    <path
      d="M31.218 41.784c.121-.436.427-.505.565-.485.478-.686-1.066.223-1.305.566-.239.343-.478.687.262.605.74-.08.327-.141.478-.686ZM27.283 30.448c.154.694-.159.788-.334.748-.095 1.078 1.102-.3 1.149-.838.047-.539.095-1.078-.72-.987-.815.09-.288.21-.095 1.077ZM24.218 37.784c.121-.436.427-.505.565-.485.478-.686-1.066.223-1.305.566-.239.343-.478.687.262.605.74-.08.327-.141.478-.686ZM22.218 27.784c.121-.436.427-.505.565-.485.478-.686-1.066.223-1.305.566-.239.344-.478.687.262.606.74-.082.327-.142.478-.687ZM22.5 33.5l-1-1.5-.5 1.5h1.5ZM35.072 32.809l-1.802.033.993 1.23.81-1.263ZM42.084 29.431l-.947-.004.536.645.41-.64ZM35.575 21l-.236.886.745-.268-.509-.618Z"
      fill="#10414B"
    />
    <ellipse
      cx={25.321}
      cy={22.938}
      rx={1.5}
      ry={3}
      transform="rotate(55.412 25.321 22.938)"
      fill="#CAE2D8"
    />
  </svg>
)

export default IronBallIcon
