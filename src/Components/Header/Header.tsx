import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import ThemeButton from '../ThemeButton/ThemeButton'
import style from './header.module.scss'

interface HeaderProp{
  menu : {title:string,link:string}[] | []
}

const Header = ({menu} : HeaderProp) =>{
  const [open, setopen] = useState(false)
  const [lightTheme, setTheme]=useState(true)
  let location = useLocation()
  function toggleMenu() {
    setopen(!open)
  } 
  function toggleTheme(val?:boolean){
    if(typeof val === 'undefined'){
      setTheme(!open);
    }else{
      setTheme(val)
    }
  }

  function renderMenu(menu : {title:string,link:string}[]){
    return menu.map((nav : {title:string,link:string}) => {
      return(
        <li className={`${location.pathname === nav.link ? style.active : ''}`} key={`menu-${nav.title}`} onClick={() => setopen(false)}><Link to={nav.link}>{nav.title}</Link></li>
      )
    })
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
            {renderMenu(menu)}
            <li className={style.themeBtnContainer}><ThemeButton state={lightTheme} toggle={toggleTheme} className={style.themeBtn}/></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header