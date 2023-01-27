import styles from './burgermenu.module.scss'

interface menuProps{
  open: boolean
  setOpen?: () => void;
  style?: React.CSSProperties;
}

const BurgerMenu = ({open, setOpen, style} : menuProps) =>{
  return(
    <button className={`${styles.burgerMenu} ${open ? styles.open: ''}`} style={style} onClick={setOpen}>
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