import { useEffect, useState } from 'react'
import MoonIcon from '../Icons/MoonIcon'
import SunIcon from '../Icons/SunIcon'
import style from './themebtn.module.scss'

interface ThemeButtonProp{
  className?:string
}
/**
 * This component both toggles and initialized the theme for the app, the default theme is light
 * the state true indicates it's in light mode and false indicating its in dark mode
 * @param className string containing the style for this component 
 * 
 */
const ThemeButton = ({ className}: ThemeButtonProp) =>{
  const [state, setState] = useState(true)
  const [firstLoad, setLoad] = useState(true)

  useEffect(() => {
    if(firstLoad){
      let theme = document.body.getAttribute('data-theme')
      let x = localStorage.getItem('ismonfasterTheme')
      if(!x || x === ''){
        localStorage.setItem('ismonfasterTheme','light')
      }else if(x === 'dark'){
        document.body.setAttribute('data-theme','dark')
        setState(false)
      }else if(x === 'light'){
        document.body.setAttribute('data-theme','light')
        setState(true)
      }else if(theme === 'dark'){
        setState(false)
      }
      setLoad(false)
    }
  }, [])
  
  function toggleState(){
    if(state){
      document.body.setAttribute('data-theme','dark')
      localStorage.setItem('ismonfasterTheme','dark')
      setState(false)
    }else{
      document.body.setAttribute('data-theme','light')
      localStorage.setItem('ismonfasterTheme','light')
      setState(true)
    }
  }
  return(
    <button className={`${style.themeBtn} ${state ? style.isDefault : ''} ${className}` } onClick={toggleState}>
      <SunIcon className={`${style.icon} ${style.sun}`}/>
      <MoonIcon className={`${style.icon} ${style.moon}`}/>
    </button>
  )
}

export default ThemeButton