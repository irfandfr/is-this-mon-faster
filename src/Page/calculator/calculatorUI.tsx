import React, { useReducer, useState } from "react"
import ActiveAbilityIcon from "../../Components/Icons/ActiveAbilityIcon"
import InputGroup from "../../Components/InputGroup/InputGroup"
import MainView from "../../Components/MainView/MainView"

import style from './calcUI.module.scss'

import { SelectionProp } from "../../Components/InputGroup/InputGroup"
import TrickRoomIcon from "../../Components/Icons/TrickRoomIcon"
import TailwindIcon from "../../Components/Icons/TailwindIcon"
import ParalyzeIcon from "../../Components/Icons/ParalyzeIcon"
import IronBallIcon from "../../Components/Icons/IronBallIcon"
import ChoiceScarfIcon from "../../Components/Icons/ChoiceScarfIcon"
import Input from "../../Components/Forms/Input/Input"
import SelectInput from "../../Components/Forms/SelectInput/SelectInput"
import Button from "../../Components/Button/Button"
import RefreshIcon from "../../Components/Icons/RefreshIcon"
import { useNavigate } from "react-router-dom"
import { PkmnData } from "../../Utils/types"
import { modifiersAbbreviator, natureToSigns } from "../../Utils/utils"

enum InitialStateKey{
  active_ability= 'active_ability',
  tailwind= 'tailwind',
  paralyze = 'paralyze',
  choice_scarf = 'choice_scarf',
  iron_ball = 'iron_ball'
}

interface pkmnData{
  base_spd: number
  lvl: number
  ev: number
  iv: number
  nature: 'beneficial' | 'hindering' | 'neutral'
  name?: string
  id?:string
  img?:string
}

interface ActionType{
  type : keyof typeof InitialStateKey
  payload : any
}

type initialState = {
  [keys in InitialStateKey] : SelectionProp
}

const CalculatorUI = () =>{
  const initialState = {
    active_ability : {icon:<ActiveAbilityIcon /> , title: 'Active Ability', id:'active_ability', value:'ab', check: false},
    tailwind : {icon:<TailwindIcon /> , title: 'Tailwind', id:'tailwind', value:'tw', check: false},
    paralyze : {icon:<ParalyzeIcon /> , title: 'Paralyze', id:'paralyze', value:'pr', check: false},
    choice_scarf : {icon:<ChoiceScarfIcon /> , title: 'Choice Scarf', id:'choice_scarf', value:'cs', check: false},
    iron_ball : {icon:<IronBallIcon /> , title: 'Iron Ball', id:'iron_ball', value:'ib', check: false},
  }
  const initialPkmnData : pkmnData = {
    base_spd: 1,
    lvl:50,
    ev: 252,
    iv: 31,
    nature: 'neutral'
  }
  const initialSelectState = {
    p1group: false,
    p2group: false,
    trstate: false
  }
  const NATURE_OPTIONS = [
    {value:'neutral', name: 'Neutral'},
    {value:'beneficial', name: 'Beneficial'},
    {value:'hindering', name: 'Hindering'},
  ]

  function reducer(state : initialState , action : ActionType){
    let radioGroup = ['iron_ball','choice_scarf']
    switch (action.type) {
      default:{
        let stateValue = state[action.type];
        let updatedCopy = {
          ...state,
          [action.type] : {...stateValue , check : !stateValue.check }
        }
        //if held item group are selected, set the others to false
        if(radioGroup.findIndex((e) => e === action.type) >= 0){
          let currentIndex = radioGroup.findIndex((e) => e === action.type)
          let i = 1 - currentIndex
          updatedCopy[radioGroup[i] as keyof initialState].check = false
        }
        return updatedCopy
      }
    }
  }
  const [p1Stat, setp1Stat] = useState<pkmnData>(initialPkmnData)
  const [p2Stat, setp2Stat] = useState<pkmnData>(initialPkmnData)
  const [selectGroupState, setGroupState] = useState(initialSelectState)
  const [stateP1 , dispatch1] = useReducer(reducer, initialState)
  const [stateP2 , dispatch2] = useReducer(reducer, initialState)
  const [stateTrickRoom , setTRstate] = useState({trick_room :{icon:<TrickRoomIcon /> , title: 'Trick Room', id:'trick_room', value:'tr', check: false}})
  const navigate = useNavigate()
  function setP1Value(id : string , value : string | number){
    setp1Stat({
      ...p1Stat,
      [id] : value
    })
  }

  function setP2Value(id : string , value : string | number){
    setp2Stat({
      ...p2Stat,
      [id] : value
    })
  }
  function getTrValue(){
    return Object.entries(stateTrickRoom).map((value : [string, SelectionProp]) =>{
      return value[1].check
    })
  }
  function trToggle(){
    let value = stateTrickRoom.trick_room
    setTRstate({
      trick_room : {...value, check : !value.check}
    })
  }

  function extractData(pkmn:pkmnData, mods: initialState){
    let pStats :any[]= [pkmn.base_spd,pkmn.ev,pkmn.iv,pkmn.lvl,natureToSigns(pkmn.nature)]
    Object.entries(mods).map((value : [string, SelectionProp]) =>{
      if(value[1].check){
        pStats.push(modifiersAbbreviator(value[0] as keyof typeof InitialStateKey))
      }
    })
    return pStats
  }

  function toResultPage(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault()
    e.currentTarget.disabled = true;
    setGroupState({
      p1group: true,
      p2group: true,
      trstate: true
    })
    setTimeout(() => {//wait incase for debounce function
      let p1data = extractData(p1Stat,stateP1);
      let p2data = extractData(p2Stat,stateP2)
      let tr = getTrValue().toString()
      let url = `/result?p1=${p1data.join('_')}&p2=${p2data.join('_')}&tr=${tr}`
    }, 800);
  }
  
  return(
    <MainView className={style.calcUIContainer}>
      <div className={style.pageHeader}>
        <h3 className={style.text}>Is</h3>
        <button className={style.faqButton}>?</button>
      </div>
      <div className={style.compareContainer}>
        <div className={style.pContainer}>
          <form className={style.formContainer}>
            <Input title="Base" id='base_spd' minValue={1} maxValue={255}type="number" required defaultValue={1} onChange={setP1Value} />
            <Input title="Lvl" id='lvl' minValue={1} maxValue={100} type="number" required defaultValue={50} onChange={setP2Value}/>
            <Input title="EV" id='ev' minValue={0} maxValue={252} defaultValue={252} type="number" onChange={setP1Value}/>
            <Input title="IV" id='iv' minValue={0} maxValue={31} defaultValue={31} type="number" onChange={setP1Value}/>
            <SelectInput options={NATURE_OPTIONS} id='nature' title="Nature" onChange={setP1Value}/>
          </form>
          <h5 className={style.text}>with</h5>
          <InputGroup groupList={stateP1} onClick={dispatch1} disabled={selectGroupState.p1group}/>
        </div>

        <h4 className={style.text}>faster<br />than</h4>
        
        <div className={style.pContainer}>
          <form className={style.formContainer}>
            <Input title="Base" id='base_spd' minValue={1} maxValue={255}type="number" required defaultValue={1} onChange={setP2Value}/>
            <Input title="Lvl" id='lvl' minValue={1} maxValue={100}type="number" required defaultValue={50} onChange={setP2Value}/>
            <Input title="EV" id='ev' minValue={0} maxValue={252} defaultValue={252} type="number" onChange={setP2Value}/>
            <Input title="IV" id='iv' minValue={0} maxValue={31} defaultValue={31} type="number" onChange={setP2Value}/>
            <SelectInput options={NATURE_OPTIONS} id='nature' title="Nature" onChange={setP2Value}/>
          </form>
          <h5 className={`${style.text}`}>with</h5>
          <InputGroup groupList={stateP2} onClick={dispatch2} disabled={selectGroupState.p2group}/>
        </div>
      </div>
      <div className={style.pContainer}>
        <h5 className={style.text}>in</h5>
        <InputGroup groupList={stateTrickRoom} onClick={trToggle} disabled={selectGroupState.trstate}/>
      </div>
      <Button icon={<RefreshIcon className={style.refreshIcon} />} onClick={toResultPage} text="Analyze" type="primary" style={{marginTop: '30px'}}/>
      {/* <a className={style.link} href="/calc">Switch to Simple</a> */}
    </MainView>
  )
}

export default CalculatorUI