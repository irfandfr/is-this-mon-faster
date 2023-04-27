import BigInput from '../../Components/Forms/BigInput/BigInput'
import InputGroup from '../../Components/InputGroup/InputGroup'
import style from './calcUI.module.scss'

//Interface Export
import { SelectionProp } from "../../Components/InputGroup/InputGroup"
import { ActionType } from './calculatorUI'
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { PkmnData } from '../../Utils/types'
import { dbToPkmnData } from '../../Utils/utils'
import { url } from 'inspector'

interface pkmnState{
  [key : string] : SelectionProp 
}
interface selectGroupStateProp{
  p1group: boolean
  p2group: boolean
}
interface PkmnSimpleSelectorProp{
  setP1Stat : (pkmn : PkmnData) => void
  setP2Stat : (pkmn : PkmnData) => void
  dispatch1: React.Dispatch<ActionType>
  dispatch2: React.Dispatch<ActionType>
  stateP1: pkmnState
  stateP2: pkmnState
  selectGroupState: selectGroupStateProp
  sprite1?: string
  sprite2?: string
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

let debounceTimer:number;


const PkmnSimpleSelector = ({setP1Stat,setP2Stat,dispatch1, dispatch2, stateP1,stateP2, selectGroupState,sprite1, sprite2,}: PkmnSimpleSelectorProp) => {
  const [pkmnList,setList] = useState<{p1: PkmnData[],p2:PkmnData[]}>({p1:[],p2:[]})

  async function onChangeInput(e: ChangeEvent<HTMLInputElement>, id:"p1"|"p2"){
    window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(()=>{
      let cleanedSearchKey = e.target.value.charAt(0).toUpperCase()+e.target.value.toLocaleLowerCase().slice(1)//convert input search to Capitalize
      axios({
        method:'get',
        url: `https://ismonfaster-default-rtdb.firebaseio.com/list.json?orderBy="$key"&startAt="${cleanedSearchKey}"&limitToFirst=10`,
        headers:{
          Accept: '*/*'
        }
      }).then((res) =>{
        if(!!res.data){
          let queriedData = []
          for(let key in res.data){
            if(key.includes(cleanedSearchKey)){
              queriedData.push(dbToPkmnData(key, res.data[key]))
            }
          }
          setList({...pkmnList,[id]: queriedData})
        }
      }).catch(err => console.log(err))
    }, 1000)
  }

  function onChangePkmn(pkmn: PkmnData, id:string){
    if(id==='p1'){
      setP1Stat(pkmn)
      setList({...pkmnList,p1:[]})
    }else if(id==='p2'){
      setP2Stat(pkmn)
      setList({...pkmnList,p2:[]})
    }
  }
  
  return(
    <div className={style.compareContainer}>
      <div className={style.pContainer} id="p1">
        <PkmnSprite img={sprite1}/>
        <BigInput className={style.pkmnInput} color='#36B7AF' pkmnList={pkmnList.p1} id='p1' onChangeInput={(e) => onChangeInput(e,"p1")} onSelectOption={onChangePkmn}/>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP1} onClick={dispatch1} disabled={selectGroupState.p1group}/>
      </div>
      <h4 className={style.text}>faster<br />than</h4>
      <div className={style.pContainer} id="p2">
        <PkmnSprite img={sprite2}/>
        <BigInput className={style.pkmnInput} color='#C13CFF' pkmnList={pkmnList.p2} id="p2" onChangeInput={(e) => onChangeInput(e,"p2")} onSelectOption={onChangePkmn}/>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP2} onClick={dispatch2} disabled={selectGroupState.p2group}/>
      </div>
    </div>
  )
}

export default PkmnSimpleSelector