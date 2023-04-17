import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import ThemeButton from '../ThemeButton/ThemeButton'
import style from './header.module.scss'

interface MenuProp{
  title : string,
  link : string
}

interface HeaderProp{
  menu : {title:string,link:string}[] | []
}

const Header = ({menu} : HeaderProp) =>{
  const [open, setopen] = useState(false)
  let location = useLocation()
  function toggleMenu(val? : boolean) {
    if(typeof val === 'undefined'){
      setopen(!open);
    }else{
      setopen(val)
    }
  }

  function renderMenu(menu : {title:string,link:string}[]){
    return menu.map((nav : {title:string,link:string}) => {
      return(
        <li className={`${location.pathname === nav.link ? style.active : ''}`} key={`menu-${nav.title}`}><Link to={nav.link}>{nav.title}</Link></li>
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
        {/*<BurgerMenu className={style.menuBtn} open={open} setOpen={toggleMenu} />*/}
        <ThemeButton state={open} toggle={toggleMenu} className={style.themeTemp}/>
        <nav className={`${style.navContainer} ${open ? style.open : ''}`}>
          <ul>
            {renderMenu(menu)}
          </ul>
          <ThemeButton state={open} toggle={toggleMenu}/>
        </nav>
      </div>
    </header>
  )
}

export default Header