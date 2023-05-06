import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styles from './button.module.scss'

interface ButtonProp{
  text?: string
  iconLink?: string
  icon?: ReactElement
  disabled? : boolean
  type? : 'primary' | 'secondary' | 'danger' 
  href? : string
  style? : React.CSSProperties
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void | ((e:React.MouseEvent<HTMLButtonElement>) => {})
}

const Button = ({text, icon, disabled, type, style, href, onClick}: ButtonProp) =>{
  
  if(!!href){
    return(
      <Link to={!!href ? href : '#'} className={`${styles.button} ${!!icon && styles.iconed} ${!!type ? styles[type] : ''}`} style={style}>
        {icon && React.cloneElement(icon, {className: `${icon.props.className} ${styles.icon}`})}
        {text}
      </Link>
    )
  }else{
    return(
      <button className={`${styles.button} ${!!icon && styles.iconed} ${!!type ? styles[type] : ''}`} disabled={disabled} style={style} onClick={onClick}>
        {icon && React.cloneElement(icon, {className: `${icon.props.className} ${styles.icon}`})}
        {text}
      </button>
    )
  }
}



export default Button