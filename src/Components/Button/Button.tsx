import styles from './button.module.scss'

interface ButtonProp{
  text?: string
  icon?: string | React.ReactNode
  disabled? : boolean
  type? : 'primary' | 'secondary' | 'danger'
  style? : React.CSSProperties
}

const Button = ({text, icon, disabled, type, style}: ButtonProp) =>{
  return(
    <button className={`${styles.button} ${!!type ? styles[type] : ''}`} disabled={disabled} style={style}>
      {text}
    </button>
  )
}

export default Button