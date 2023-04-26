import { useLayoutEffect, useState } from 'react'
import MoonIcon from '../Icons/MoonIcon'
import SunIcon from '../Icons/SunIcon'
import Skeleton from '../Skeleton/Skeleton'
import style from './themebtn.module.scss'

interface ThemeButtonProp{
  state: boolean
  toggle: (val:boolean) => void
  className?:string
}
/**
 * This component both toggles and initialized the theme for the app, the default theme is light
 * the state true indicates it's in light mode and false indicating its in dark mode
 * @param className string containing the style for this component 
 * 
 */
const ThemeButton = ({ state, toggle, className}: ThemeButtonProp) =>{
  const [firstLoad, setLoad] = useState(true)

  useLayoutEffect(() => {
    if(firstLoad){
      let dataTheme = document.body.getAttribute('data-theme')
      let theme = localStorage.getItem('ismonfasterTheme')
      if(!theme || theme === ''){
        localStorage.setItem('ismonfasterTheme','light')
      }else if(theme === 'dark'){
        document.body.setAttribute('data-theme','dark')
        toggle(false)
      }else if(theme === 'light'){
        document.body.setAttribute('data-theme','light')
        toggle(true)
      }else if(dataTheme === 'dark'){
        toggle(false)
      }
      setLoad(false)
    }
  })
  
  function toggleState(){
    document.body.setAttribute('data-theme',`${state ? "dark" : "light"}`)
    localStorage.setItem('ismonfasterTheme',`${state ? "dark" : "light"}`)
    toggle(!state)
  }

  return(
    <button className={`${style.themeBtn} ${state ? style.isDefault : ''} ${className}` } onClick={toggleState}>
      <SunIcon className={`${style.icon} ${style.sun}`}/>
      <MoonIcon className={`${style.icon} ${style.moon}`}/>
      <div className={style.circle} style={!state ? {transform: 'translate(-30px)'} : {transform: 'translate(0px)'}}></div>
    </button>
  )
}

export default ThemeButton