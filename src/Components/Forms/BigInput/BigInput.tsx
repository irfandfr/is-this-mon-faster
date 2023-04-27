import { ChangeEvent, ChangeEventHandler, useLayoutEffect, useRef, useState } from 'react'
import style from './biginput.module.scss'

interface BigInputProp{
  color?: string
  disabled?: boolean
  defaultValue?: string
  className?: string
}


const BigInput = ({color, disabled, defaultValue, className} : BigInputProp) =>{
  const txtArea = useRef<HTMLTextAreaElement>(null)
  const rowCount = useRef(1)
  const [currHeight, setHeight] = useState(30)

  function onChange(e : ChangeEvent<HTMLTextAreaElement>){
    if(!!txtArea.current && txtArea.current.scrollHeight > currHeight + 10 ){//resize if input is longer than width
      setHeight(txtArea.current.scrollHeight)
      rowCount.current += 1 
    }else if(e.currentTarget.value.length <= rowCount.current * 18){//reset size if somewords are deleted
      setHeight(30)
      rowCount.current = Math.max(Math.ceil(e.currentTarget.value.length / 18),1)
    }
  }
  useLayoutEffect(() => {
    if(!!txtArea.current && txtArea.current.scrollHeight > currHeight + 10){//check if current height is smaller in case of value deletion
      setHeight(txtArea.current.scrollHeight)
    }
  }, [currHeight])

  return(
    <>
      <div className={`${style.bigInputContainer} ${className}`}>
          <textarea spellCheck={false} disabled={disabled} ref={txtArea} onChange={onChange} defaultValue={defaultValue} className={style.bigInput} name="" id="" style={{color: color, height: currHeight}}/>
          <span className={style.underline}></span>
      </div>
    </>
  )
}

export default BigInput