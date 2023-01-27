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
      <a href="/" className={style.appLogoName}>
        <img src="/isMonFasterLogo.svg" alt="isMonFaster Logo" style={{height: '30px'}}/>
        <span className={style.headerAppName}> isMonFaster?</span> 
      </a>
      <BurgerMenu open={open} setOpen={toggleMenu} style={{marginLeft: 'auto'}}/>
    </header>
  )
}

export default Header