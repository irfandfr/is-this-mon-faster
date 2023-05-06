import { useLayoutEffect, useState } from 'react'
import MoonIcon from '../Icons/MoonIcon'
import SunIcon from '../Icons/SunIcon'
import Skeleton from '../Skeleton/Skeleton'
import styles from './themebtn.module.scss'

interface ThemeButtonProp{
  state: boolean
  toggle: (val:boolean) => void
  className?:string
  style?: React.CSSProperties
}
/**
 * This component both toggles and initialized the theme for the app, the default theme is light
 * the state true indicates it's in light mode and false indicating its in dark mode
 * @param className string containing the styles for this component 
 * 
 */
const ThemeButton = ({ state, toggle, className, style}: ThemeButtonProp) =>{
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
    <button className={`${styles.themeBtn} ${state ? styles.isDefault : ''} ${className}` } onClick={toggleState} style={style}>
      <SunIcon className={`${styles.icon} ${styles.sun}`}/>
      <MoonIcon className={`${styles.icon} ${styles.moon}`}/>
      <div className={styles.circle} style={!state ? {transform: 'translate(-30px)'} : {transform: 'translate(0px)'}}></div>
    </button>
  )
}

export default ThemeButton