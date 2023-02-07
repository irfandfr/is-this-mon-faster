import styles from './button.module.scss'

interface ButtonProp{
  text?: string
  icon?: string | React.ReactNode
  disabled? : boolean
  type? : 'primary' | 'secondary' | 'danger'
  style? : React.CSSProperties
  onClick?: () => void | (() => {})
}

const Button = ({text, icon, disabled, type, style, onClick}: ButtonProp) =>{
  return(
    <button className={`${styles.button} ${!!type ? styles[type] : ''}`} disabled={disabled} style={style} onClick={onClick}>
      {text}
    </button>
  )
}



export default Button