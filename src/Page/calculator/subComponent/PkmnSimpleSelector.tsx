import { ChangeEvent, useState } from 'react'
import BigInput from '../../../Components/Forms/BigInput/BigInput'
import InputGroup from '../../../Components/InputGroup/InputGroup'
import axios from 'axios'

//Interface Export
import { SelectionProp } from "../../../Components/InputGroup/InputGroup"
import { ActionType } from '../calculatorUI'
import { PkmnData } from '../../../Utils/types'

//import utils
import { dbToPkmnData } from '../../../Utils/utils'


import style from '../calcUI.module.scss'

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
        <img className={style.pkmnSprite} src={img} alt={`${name}'s sprite`} loading="lazy"/>
      ):(
        <div className={`${style.pkmnSprite} ${style.placeholder}`}>?</div>
      )}
    </div>
  )
}

let debounceTimer:number;


const PkmnSimpleSelector = ({setP1Stat,setP2Stat,dispatch1, dispatch2, stateP1,stateP2, selectGroupState,sprite1, sprite2,}: PkmnSimpleSelectorProp) => {
  const [pkmnList,setList] = useState<{p1: PkmnData[],p2:PkmnData[]}>({p1:[],p2:[]})
  const [loadData, setLoad] = useState({p1: false, p2: false})

  async function onChangeInput(e: ChangeEvent<HTMLInputElement>, id:"p1"|"p2"){
    window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(()=>{
      if(e.target.value !== ''){
        let cleanedSearchKey = encodeURIComponent(e.target.value.split(' ').map((query) => query.charAt(0).toUpperCase()+query.toLocaleLowerCase().slice(1)).join(' '))//convert input search to Capitalize
        setLoad({...loadData, [id] : true})
        axios({
          method:'get',
          url: `https://ismonfaster-default-rtdb.firebaseio.com/listv2.json?orderBy="$key"&startAt="${cleanedSearchKey}"&limitToFirst=10`,
          headers:{
            Accept: '*/*'
          }
        }).then((res) =>{
          setLoad({...loadData, [id] : false})
          if(!!res.data){
            let queriedData = []
            for(let key in res.data){
              if(key.includes(decodeURIComponent(cleanedSearchKey))){
                queriedData.push(dbToPkmnData(key, res.data[key]))
              }
            }
            setList({...pkmnList,[id]: queriedData})
          }
        }).catch(err => {
          console.log(err)
          setLoad({...loadData, [id] : false})
        })
      }
    }, 500)
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
        <BigInput className={style.pkmnInput} color='#36B7AF' load={loadData.p1} pkmnList={pkmnList.p1} id='p1' onChangeInput={(e) => onChangeInput(e,"p1")} onSelectOption={onChangePkmn}/>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP1} onClick={dispatch1} disabled={selectGroupState.p1group}/>
      </div>
      <h4 className={style.text}>faster<br />than</h4>
      <div className={style.pContainer} id="p2">
        <PkmnSprite img={sprite2}/>
        <BigInput className={style.pkmnInput} color='#C13CFF' load={loadData.p2} pkmnList={pkmnList.p2} id="p2" onChangeInput={(e) => onChangeInput(e,"p2")} onSelectOption={onChangePkmn}/>
        <h5 className={style.text}>with</h5>
        <InputGroup groupList={stateP2} onClick={dispatch2} disabled={selectGroupState.p2group}/>
      </div>
    </div>
  )
}

export default PkmnSimpleSelector