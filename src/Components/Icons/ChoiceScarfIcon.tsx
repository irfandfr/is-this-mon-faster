import * as React from "react"

interface Props{
  width?:number,
  height?:number,
  style?: React.CSSProperties
  className?: string
}

const ChoiceScarfIcon = ({width, height, style, className} : Props) => (
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
      d="M40.658 13.09c3.697-.461 7.394.925 7.856 2.311.462 1.387.924 5.545-1.386 5.545.154 6.316-1.294 19.963-8.318 24.03-7.024 4.066-14.634 1.078-17.56-.924 4.588-1.06 7.29-6.163 8.722-12.015-1.521.154-5.488 2.773-11.957.924-6.053-1.73-7.394-5.391-6.931-7.394 3.696 3.235 14.325-8.78 18.946-10.166 3.697-1.109 7.082-.088 8.313.56-.028-1.33.478-2.64 2.315-2.87Z"
      fill="#5297D2"
    />
    <path
      d="m36.5 22.795-2.311-3.235-.925.924c-.739.74-1.54 3.081-1.848 4.16l4.621 3.234 11.09-.924v-4.621l-10.628.462ZM36.037 31.575l-5.083-4.16-.924 5.084 3.697 3.697 11.552-1.386 1.386-5.546-10.628 2.31Z"
      fill="#CDF3F3"
    />
    <path
      d="m31.416 38.968-1.848-4.62-1.849 3.696.924 3.697h13.864l1.848-4.159-12.939 1.386ZM25.613 41.279l-2.515 2.773c.74 2.587 6.316 2.926 9.704 2.772l5.084-1.848-12.273-.924v-2.773Z"
      fill="#CDF3F3"
    />
    <path
      d="m31.878 15.401 2.773 4.16c-1.849 1.108-2.31 2.618-2.773 3.234l-2.772-6.932 2.772-.462Z"
      fill="#A7F7F7"
    />
    <path
      d="m26.333 17.712 4.621 8.317c-.924 1.849-.462 4.93-.924 5.546L24.022 19.56l2.31-1.848ZM21.712 20.946 28.643 32.5c-.462 1.386-4.256.127-4.62.924l-5.084-10.628 2.773-1.849ZM14.78 25.567l6.008 7.856c-2.31 0-4.72-1.721-5.083-.924l-3.697-6.47 2.772-.462Z"
      fill="#A7F6F6"
    />
    <path
      d="M38.81 18.174c2.772-2.31 7.148 1.435 8.318 2.772m-8.318-2.772c-1.849-.924-7.117 2.033-7.856 8.318a46.218 46.218 0 0 1-.982 5.545m8.838-13.863a6.617 6.617 0 0 1-.467-2.212m.467 2.212c-1.079.924-3.143 3.697-2.773 7.393.462 4.622.462 7.394-.462 8.318m11.553-12.939c2.31 0 1.848-4.159 1.386-5.545-.462-1.386-4.16-2.772-7.856-2.31-1.837.23-2.343 1.54-2.315 2.87m8.785 4.985c.154 6.316-1.294 19.963-8.318 24.03-7.024 4.066-14.634 1.078-17.56-.924 4.588-1.06 7.29-6.163 8.722-12.015m8.371-16.075c-1.23-.65-4.616-1.67-8.313-.56-4.621 1.386-15.25 13.4-18.947 10.165-.462 2.003.879 5.665 6.932 7.394 6.47 1.849 10.436-.77 11.957-.924"
      stroke="#0D2826"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ChoiceScarfIcon
