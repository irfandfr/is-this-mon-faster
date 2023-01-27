import styles from './card.module.scss'

interface CardProp{
  children? : React.ReactNode
  className?: string
  style? : React.CSSProperties
}

const Card = ({children, className, style} : CardProp) =>{
  return(
    <div className={`${styles.card} ${!!className? className : ''}`} style={style}>
      {children}
    </div>
  )
}

export default Card