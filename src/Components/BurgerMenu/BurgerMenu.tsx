import styles from './burgermenu.module.scss'

interface menuProps{
  open: boolean
  className?: string
  setOpen?: () => void;
  style?: React.CSSProperties;
}

const BurgerMenu = ({open, className, setOpen, style} : menuProps) =>{
  return(
    <button className={`${styles.burgerMenu} ${!!className ? className : ''} ${open ? styles.open: ''}`} style={style} onClick={setOpen}>
      <div className={styles.barContainer}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div></div>
    </button>
  )
}

export default BurgerMenu;