import axios from 'axios'
import React, { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PkmnData } from '../../../Utils/types'
import Spinner from '../../Spinner/Spinner'
import style from './biginput.module.scss'

interface BigInputProp {
  id: string
  color?: string
  disabled?: boolean
  defaultValue?: string
  className?: string
  pkmnList?: PkmnData[]
  load?: boolean
  display?: boolean
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectOption?: (pkmn: PkmnData,id:string) => void
}

let blurTimer : number;
const BigInput = ({ id, color, disabled, defaultValue, className, pkmnList, display, load, onChangeInput, onSelectOption }: BigInputProp) => {
  const [currPkmn, setPkmn] = useState(!!defaultValue ? defaultValue : '')
  const [displayPkmn, setDisplay] = useState(!!defaultValue ? defaultValue : '')
  const [animFlag, setFlag] = useState(false)
  const [hideSelect, setSelect] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  function updatePkmn(pkmn:PkmnData){
    setPkmn(pkmn.name!)
    !!onSelectOption && onSelectOption(pkmn,id)
    window.clearTimeout(blurTimer)
    if(inputRef.current){
      inputRef.current.value = pkmn.name!
      inputRef.current.blur()
    }
  }

  function onBlur(){
    blurTimer = window.setTimeout(() => {
      if(inputRef.current)
        inputRef.current.value = currPkmn
      setSelect(true)
    }, 200);
  }

  useLayoutEffect(() => {
    if(typeof pkmnList !== 'undefined'){
      setSelect(false)
    }
  }, [pkmnList])

  async function getRandomPkmnObject(){
    let index = Math.floor(Math.random() * (400) + 1);
    return axios({
      method:'get',
      url: `${process.env.REACT_APP_IS_MON_DB}.json?orderBy="number/paldea"&startAt=${index}&endAt=${index}`,
      headers:{
        Accept: '*/*'
      }
    })
  }

  function addTextAnimation(){
    if(currPkmn !== displayPkmn){
      setTimeout(() => {
        setDisplay(displayPkmn+currPkmn.charAt(displayPkmn.length))
      }, 200);
    }
  }

  function deleteTextAnimation(){
    if(displayPkmn.length > 0){
      let x = displayPkmn

      setDisplay(x.slice(0, -1))
      console.log(displayPkmn)
      setTimeout(() => {
        deleteTextAnimation()
      }, 500);
    }else{
      addTextAnimation()
    }
  }

  useLayoutEffect(() => {
    if(animFlag){
      if(displayPkmn.length > 0){
        let x = displayPkmn
        setTimeout(() => {
          setDisplay(x.slice(0, -1))
        }, 100);
      }else{
        setTimeout(() => {
          setFlag(false)
        }, 1000);
      }
    }else if(displayPkmn !== currPkmn){
      setTimeout(() => {
        setDisplay(displayPkmn+currPkmn.charAt(displayPkmn.length))
      }, 100);
    }
  },[animFlag,displayPkmn])

  useEffect(() =>{
    let interval: NodeJS.Timer;
    if(display){
     interval = setInterval(() => {
      getRandomPkmnObject().then((res) => {
        if(!!res.data){
          setPkmn(Object.keys(res.data)[0])
          setFlag(true)
        }
      }).catch((err) => {
        console.log(err)
      })
     }, 6000);
    }
    return () => {
      clearInterval(interval)
    }
  },[display])


  return (
    <>
      <div className={`${style.bigInputContainer} ${className}`}>
        {display ? (
          <div className={style.displayContainer}>
            <h2 style={{color: color}}>{displayPkmn}</h2>
            <div className={style.cursor}></div>
          </div>
        ):(
          <input list={id} spellCheck={false} ref={inputRef} disabled={disabled} defaultValue={defaultValue} className={style.bigInput} name="" id="" style={{ color: color }} onChange={onChangeInput} onBlur={onBlur} placeholder="???"/>
        )}
        <span className={style.underline}></span>
        {load && <Spinner className={style.spinner}/>}
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