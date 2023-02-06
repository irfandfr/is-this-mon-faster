import style from './biginput.module.scss'

interface BigInputProp{
  color?: string
}


const BigInput = ({color} : BigInputProp) =>{
  return(
    <>
      <div className={style.bigInputContainer}>
          <input className={style.bigInput} type="text" name="" id="" style={{color: color}}/>
          <span className={style.underline}></span>
      </div>
    </>
  )
}

export default BigInput