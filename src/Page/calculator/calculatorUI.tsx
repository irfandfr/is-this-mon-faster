import { useReducer, useState } from "react"
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

enum InitialStateKey{
  active_ability= 'active_ability',
  tailwind= 'tailwind',
  paralyze = 'paralyze',
  choice_scarf = 'choice_scarf',
  iron_ball = 'iron_ball'
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

  const [stateP1 , dispatch1] = useReducer(reducer, initialState)
  const [stateP2 , dispatch2] = useReducer(reducer, initialState)
  const [stateTrickRoom , setTRstate] = useState({trick_room :{icon:<TrickRoomIcon /> , title: 'Trick Room', id:'trick_room', value:'tr', check: false}})

  function trToggle(){
    let value = stateTrickRoom.trick_room
    setTRstate({
      trick_room : {...value, check : !value.check}
    })
  }
  return(
    <MainView className={style.calcUIContainer}>
      <h3 className={style.text}>Is</h3>
      <div className={style.compareContainer}>
        <div className={style.pContainer}>
          <form className={style.formContainer}>
            <Input title="Name" id='p1name' type="text"/>
            <Input title="Base" id='p1base' minValue={1} maxValue={255}type="number" required defaultValue={1}/>
            <Input title="EV" id='p1ev' minValue={0} maxValue={252} defaultValue={252} type="number"/>
            <Input title="IV" id='p1iv' minValue={0} maxValue={31} defaultValue={31} type="number"/>
            <SelectInput options={NATURE_OPTIONS} id='p1nature' title="Nature"/>
          </form>
          <h5 className={style.text}>with</h5>
          <InputGroup groupList={stateP1} onClick={dispatch1}/>
        </div>

        <h4 className={style.text}>faster<br />than</h4>
        
        <div className={style.pContainer}>
          <form className={style.formContainer}>
            <Input title="Name" id='p2name' type="text"/>
            <Input title="Base" id='p2base' minValue={1} maxValue={255}type="number" required defaultValue={1}/>
            <Input title="EV" id='p2ev' minValue={0} maxValue={252} defaultValue={252} type="number"/>
            <Input title="IV" id='p2iv' minValue={0} maxValue={31} defaultValue={31} type="number"/>
            <SelectInput options={NATURE_OPTIONS} id='p2nature' title="Nature"/>
          </form>
          <h5 className={`${style.text}`}>with</h5>
          <InputGroup groupList={stateP2} onClick={dispatch2}/>
        </div>
      </div>
      <div className={style.pContainer}>
        <h5 className={style.text}>in</h5>
        <InputGroup groupList={stateTrickRoom} onClick={trToggle} />
      </div>
      <Button text="Analyze" type="primary" style={{marginTop: '30px', marginBottom: '40px'}}/>
    </MainView>
  )
}

export default CalculatorUI