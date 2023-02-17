import React, { ReactElement } from 'react'
import style from './modcontainer.module.scss'

interface ModifierContainerProp{
  icon: ReactElement
  className?: string
  text?: string
  size?: 's' | 'm'
}

const ModifierContainer = ({icon, className, text, size} : ModifierContainerProp) =>{
  let styledIcon = React.cloneElement(icon,{className: style.modIcon})
  return(
    <div className={`${style.modContainer} ${size && style[size]} ${className}`}>
      {!!text && <span className={style.modTooltip}>{text}</span>}
      {styledIcon}
    </div>
  )
}

export default ModifierContainer