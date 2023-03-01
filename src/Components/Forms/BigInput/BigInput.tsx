import style from './biginput.module.scss'

interface BigInputProp{
  color?: string
  disabled?: boolean
  defaultValue?: string
  className?: string
}


const BigInput = ({color, disabled, defaultValue, className} : BigInputProp) =>{
  return(
    <>
      <div className={`${style.bigInputContainer} ${className}`}>
          <input disabled={disabled} defaultValue={defaultValue} className={style.bigInput} type="text" name="" id="" style={{color: color}}/>
          <span className={style.underline}></span>
      </div>
    </>
  )
}

export default BigInput