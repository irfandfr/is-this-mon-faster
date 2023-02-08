import { useReducer } from "react"
import ActiveAbility from "../../Components/Icons/ActiveAbilityIcon"
import InputGroup from "../../Components/InputGroup/InputGroup"
import MainView from "../../Components/MainView/MainView"

import style from './calcUI.module.scss'

import { SelectionProp } from "../../Components/InputGroup/InputGroup"

enum InitialStateKey{
  active_ability= 'active_ability',
  trick_room = 'trick_room'
}

interface ActionType{
  type : keyof typeof InitialStateKey
  payload : any
}

type initialState = {
  [keys in InitialStateKey] : SelectionProp
}

const CalculatorUI = () =>{
  const MENU_LIST = [
    {icon:<ActiveAbility /> , title: 'Active Ability', id:'active_ability', value:'ab', check: false},
    {icon:<ActiveAbility /> , title: 'Active Ability', id:'active_ability', value:'ac', check: true}
  ]
  const initialState = {
    active_ability : {icon:<ActiveAbility /> , title: 'Active Ability', id:'active_ability', value:'ab', check: false},
    trick_room : {icon:<ActiveAbility /> , title: 'Trick Room', id:'trick_room', value:'tr', check: false}
  }

  function reducer(state : initialState , action : ActionType){
    switch (action.type) {
      default:{
        let stateValue = state[action.type];
        return{
          ...state,
          [action.type] : {...stateValue , check : !stateValue.check }
        }
      }
    }
  }

  const [state , dispatch] = useReducer(reducer, initialState)

  return(
    <MainView className={style.calcUIContainer}>
      <h3 className={style.text}>Is</h3>
      <div className={style.pContainer}>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={state} onClick={dispatch}/>
      </div>
    </MainView>
  )
}

export default CalculatorUI