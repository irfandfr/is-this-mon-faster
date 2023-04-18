import BigInput from '../../Components/Forms/BigInput/BigInput'
import InputGroup from '../../Components/InputGroup/InputGroup'
import style from './calcUI.module.scss'

//Interface Export
import { SelectionProp } from "../../Components/InputGroup/InputGroup"
import { ActionType } from './calculatorUI'

interface pkmnState{
  [key : string] : SelectionProp 
}
interface selectGroupStateProp{
  p1group: boolean
  p2group: boolean
}
interface PkmnSimpleSelectorProp{
  setP1Value : (id : string , value : string | number) => void
  setP2Value : (id : string , value : string | number) => void
  dispatch1: React.Dispatch<ActionType>
  dispatch2: React.Dispatch<ActionType>
  stateP1: pkmnState
  stateP2: pkmnState
  selectGroupState: selectGroupStateProp
}

interface PkmnSpriteProp{
  img?:string
  name?:string
}

const PkmnSprite = ({img, name} : PkmnSpriteProp) => {
  return (
    <div className={style.spriteContainer}>
      {!!img ? (
        <img className={style.pkmnSprite} src={img} alt={`${name}'s sprite`} />
      ):(
        <div className={`${style.pkmnSprite} ${style.placeholder}`}>?</div>
      )}
    </div>
  )
}


export const PkmnSimpleSelector = ({setP1Value,setP2Value,dispatch1, dispatch2, stateP1,stateP2, selectGroupState}: PkmnSimpleSelectorProp) => {
  return(
    <div className={style.compareContainer}>
      <div className={style.pContainer} id="p1">
        <PkmnSprite />
        <BigInput className={style.pkmnInput}/>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP1} onClick={dispatch1} disabled={selectGroupState.p1group}/>
      </div>
      <h4 className={style.text}>faster<br />than</h4>
      <div className={style.pContainer} id="p2">
        <PkmnSprite />
        <BigInput className={style.pkmnInput} />
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP2} onClick={dispatch2} disabled={selectGroupState.p2group}/>
      </div>
    </div>
  )
}