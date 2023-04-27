import React, { ChangeEvent, useLayoutEffect, useRef, useState } from 'react'
import { PkmnData } from '../../../Utils/types'
import style from './biginput.module.scss'

interface BigInputProp {
  id: string
  color?: string
  disabled?: boolean
  defaultValue?: string
  className?: string
  pkmnList?: PkmnData[]
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectOption?: (pkmn: PkmnData,id:string) => void
}


const BigInput = ({ id, color, disabled, defaultValue, className, pkmnList, onChangeInput, onSelectOption }: BigInputProp) => {
  const [currPkmn, setPkmn] = useState(!!defaultValue ? defaultValue : '')
  const [hideSelect, setSelect] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  function updatePkmn(pkmn:PkmnData){
    setPkmn(pkmn.name!)
    !!onSelectOption && onSelectOption(pkmn,id)
    if(inputRef.current){
      inputRef.current.value = pkmn.name!
      inputRef.current.blur()
    }
  }

  function onBlur(){
    if(inputRef.current)
      inputRef.current.value = currPkmn
    setSelect(true)
  }

  useLayoutEffect(() => {
    setSelect(false)
  }, [pkmnList])


  return (
    <>
      <div className={`${style.bigInputContainer} ${className}`}>
        <input list={id} spellCheck={false} ref={inputRef} disabled={disabled} defaultValue={defaultValue} className={style.bigInput} name="" id="" style={{ color: color }} onChange={onChangeInput} onBlur={onBlur} placeholder="???"/>
        <span className={style.underline}></span>
        <div className={`${style.optionsContainer} ${hideSelect ? style.hide : ''}`}>
          {pkmnList?.map(pkmn => {
            return (
              <option tabIndex={0} className={style.option} value={pkmn.name} key={`select${pkmn.name}`} onClick={() => updatePkmn(pkmn)}>{pkmn.name}</option>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BigInput