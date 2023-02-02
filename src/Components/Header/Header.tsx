import { useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import style from './header.module.scss'

const Header = () =>{
  const [open, setopen] = useState(false)

  function toggleMenu() {
    setopen(!open);
  }
  return(
    <header className={style.header}>
      <div className={style.headerContent}>
        <a href="/" className={style.appLogoName}>
          <img src="/isMonFasterLogo.svg" alt="isMonFaster Logo" className={style.isMonLogo}/>
          <span className={style.headerAppName}> isMonFaster?</span> 
        </a>
        <BurgerMenu className={style.menuBtn} open={open} setOpen={toggleMenu} />
        <nav className={`${style.navContainer} ${open ? style.open : ''}`}>
          <ul>
            <li className={style.active}>Home</li>
            <li>Calculator</li>
            <li>Advanced Calculator</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header