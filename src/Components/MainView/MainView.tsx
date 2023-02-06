import styles from './mainview.module.scss'

interface MainViewProps{
  children : React.ReactNode
  className?: string
  style? : React.CSSProperties
}

const MainView = ({children, className, style} : MainViewProps) =>{
  return(
    <main className={`${styles.mainview}  ${!!className ? className : ''}`} style={style}>
      {children}
    </main>
  )
}

export default MainView