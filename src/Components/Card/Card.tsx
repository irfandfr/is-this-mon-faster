import React from 'react'
import CheckIcon from '../Icons/CheckIcon'
import CrossIcon from '../Icons/CrossIcon'
import WarningIcon from '../Icons/WarningIcon'
import styles from './card.module.scss'

interface CardProp{
  children? : React.ReactNode
  className?: string
  style? : React.CSSProperties
}

interface CardHeaderProp{
  text: string
}

interface CardListItemProp {
  text: string
  type? : 'warning' | 'safe' | 'danger' 
}

const Card = ({children, className, style} : CardProp) =>{
  return(
    <div className={`${styles.card} ${!!className? className : ''}`} style={style}>
      {children}
    </div>
  )
}

const Header : React.FC<CardHeaderProp> = ({text} : CardHeaderProp) => {
  return(
    <div className={styles.header}>
      <h3>{text}</h3>
      <hr />
    </div>
  )
}
Card.Header = Header

const ListItem : React.FC<CardListItemProp> = ({text, type} : CardListItemProp) =>{
  function renderIconType(type : 'warning' | 'safe' | 'danger' | undefined){
    switch (type) {
      case 'safe':
        return( <CheckIcon className={styles.icon}/>)
      case 'warning':
        return(<WarningIcon className={styles.icon}/>)
      case 'danger':
        return(<CrossIcon className={styles.icon}/>)
      default:
        return(<div className={styles.dot}><span></span></div>)
    }
  }
  return(
    <div className={styles.listItem}>
      {renderIconType(type)}
      <p>{text}</p>
    </div>
  )
}
Card.ListItem = ListItem
export default Card