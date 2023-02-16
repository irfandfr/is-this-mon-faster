import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const TailwindIcon = ({width, height, style, className} : Props) => (
  <svg
    width={!!width ? width : (!!height? (height * 60)/60:'60')}
    height={!!height ? height : (!!width? (width * 60)/60:'60')}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    style={{...style}}
    className={!!className ? className : ''}
  >
    <path
      d="M9.286 32V30.196c8.348 0 26.988.304 29.214.304 2.783 0 7 .544 7 7.5 0 7.5-4.5 7.5-7.5 7.5s-8-.5-8-6.5c0-5.569 4.627-6.37 7.112-6.022V34.5C35.257 34.268 32 34.548 32 39c0 3 2 5 6 5 5.565 0 5.5-4.145 5.5-6 0-5.565-2.5-6-5-6H9.286ZM33.633 27.413V29.5h10.783c4.084 0 8.584-1.891 8.584-8 0-3.654-3.416-6.5-7-6.5-.916 0-7.5 0-7.5 6 0 5.569 5.016 5.348 7.5 5v-2c-1.916 0-5.5 1.452-5.5-3 0-3 2-4 5.5-4 3 0 4.5 2 4.5 4.5 0 4-2 5.913-6.084 5.913H33.634ZM9.286 27.413v1.391c5.618 0 17.716.196 19.214.196 3 0 5.481-1.903 5.481-6.962 0-5.06-5.264-5.06-5.966-5.06-.703 0-4.683 0-4.85 5.06-.133 4.047 3.178 4.3 4.85 4.047L28 24.5c-1 0-3.5 0-3.5-2.462 0-3.238 2.266-3.538 3.515-3.538 3.746 0 4.485 2.188 4.485 3.538 0 4.047-2.345 5.375-4.485 5.375H9.285Z"
      fill="#2ED4AD"
    />
    <path d="M7 24.929h8.571" stroke="#2ED4AD" strokeWidth={1.4} />
    <path d="M13 34.5h10.286" stroke="#2ED4AD" strokeWidth={1.5} />
  </svg>
)

export default TailwindIcon
