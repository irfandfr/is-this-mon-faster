import ActiveAbility from "../../Components/Icons/ActiveAbilityIcon"
import InputGroup from "../../Components/InputGroup/InputGroup"
import MainView from "../../Components/MainView/MainView"

import style from './calcUI.module.scss'

const CalculatorUI = () =>{
  const MENU_LIST = [
    {icon:<ActiveAbility /> , title: 'Active Ability', id:'active_ability', value:'ab', check: false},
    {icon:<ActiveAbility /> , title: 'Active Ability', id:'active_ability', value:'ac', check: true}
  ]
  return(
    <MainView className={style.calcUIContainer}>
      <h3 className={style.text}>Is</h3>
      <div className={style.pContainer}>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={MENU_LIST}/>
      </div>
    </MainView>
  )
}

export default CalculatorUI