import React, { ReactElement } from 'react'
import styles from './button.module.scss'

interface ButtonProp{
  text?: string
  iconLink?: string
  icon?: ReactElement
  disabled? : boolean
  type? : 'primary' | 'secondary' | 'danger'
  style? : React.CSSProperties
  onClick?: () => void | (() => {})
}

const Button = ({text, icon, disabled, type, style, onClick}: ButtonProp) =>{
  
  return(
    <button className={`${styles.button} ${!!icon && styles.iconed} ${!!type ? styles[type] : ''}`} disabled={disabled} style={style} onClick={onClick}>
      {icon && React.cloneElement(icon, {className: `${icon.props.className} ${styles.icon}`})}
      {text}
    </button>
  )
}



export default Button