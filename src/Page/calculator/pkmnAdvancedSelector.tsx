import Input from '../../Components/Forms/Input/Input'
import SelectInput from '../../Components/Forms/SelectInput/SelectInput'
import InputGroup from '../../Components/InputGroup/InputGroup'

//Interface Export
import { SelectionProp } from "../../Components/InputGroup/InputGroup"
import { ActionType } from './calculatorUI'

import style from './calcUI.module.scss'

interface pkmnState{
  [key : string] : SelectionProp 
}
interface selectGroupStateProp{
  p1group: boolean
  p2group: boolean
}

interface CaclAdvancedProp{
  setP1Value : (id : string , value : string | number) => void
  setP2Value : (id : string , value : string | number) => void
  dispatch1: React.Dispatch<ActionType>
  dispatch2: React.Dispatch<ActionType>
  stateP1: pkmnState
  stateP2: pkmnState
  selectGroupState: selectGroupStateProp
  natures : {value: string, name:string}[] 
}

export const PkmnAdvancedSelector = ({setP1Value,setP2Value,dispatch1, dispatch2, stateP1,stateP2, selectGroupState, natures}: CaclAdvancedProp) =>{
  return (
    <div className={style.compareContainer}>
        <div className={style.pContainer} id="p1">
          <form className={style.formContainer}>
            <Input title="Base" id='base_spd' minValue={1} maxValue={255}type="number" required defaultValue={100} onChange={setP1Value} />
            <Input title="Lvl" id='lvl' minValue={1} maxValue={100} type="number" required defaultValue={50} onChange={setP2Value}/>
            <Input title="EV" id='ev' minValue={0} maxValue={252} defaultValue={252} type="number" onChange={setP1Value}/>
            <Input title="IV" id='iv' minValue={0} maxValue={31} defaultValue={31} type="number" onChange={setP1Value}/>
            <SelectInput options={natures} id='nature' title="Nature" onChange={setP1Value}/>
          </form>
          <h5 className={style.text}>with</h5>
          <InputGroup groupList={stateP1} onClick={dispatch1} disabled={selectGroupState.p1group}/>
        </div>

        <h4 className={style.text}>faster<br />than</h4>
        
        <div className={style.pContainer} id="p2">
          <form className={style.formContainer}>
            <Input title="Base" id='base_spd' minValue={1} maxValue={255}type="number" required defaultValue={100} onChange={setP2Value}/>
            <Input title="Lvl" id='lvl' minValue={1} maxValue={100}type="number" required defaultValue={50} onChange={setP2Value}/>
            <Input title="EV" id='ev' minValue={0} maxValue={252} defaultValue={252} type="number" onChange={setP2Value}/>
            <Input title="IV" id='iv' minValue={0} maxValue={31} defaultValue={31} type="number" onChange={setP2Value}/>
            <SelectInput options={natures} id='nature' title="Nature" onChange={setP2Value}/>
          </form>
          <h5 className={`${style.text}`}>with</h5>
          <InputGroup groupList={stateP2} onClick={dispatch2} disabled={selectGroupState.p2group}/>
        </div>
      </div>
  )
}
