import Button from "../../Components/Button/Button"
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon"
import MainView from "../../Components/MainView/MainView"
import ResultCard from "./subcomponent/ResultCard"
import StatCalcCard from "./subcomponent/StatCalcCard"

import style from "./result.module.scss"
import { Modifiers, PkmnBaseStat } from "../../Utils/types"
import advancedModeAnalyzer, { responseProp } from "../../Utils/advancedModeAnalyzer"
import { useEffect, useState } from "react"
import LoadingPage from "../loading/Loading"
import { useLocation } from "react-router-dom"
import { modifiersExtendor, signsToNature } from "../../Utils/utils"

interface ResultPageInterface{
  advanced: boolean
}

interface pData{
  p1 : PkmnBaseStat
  p2 : PkmnBaseStat
  p1mod : Modifiers[]
  p2mod : Modifiers[]
}


const ResultPage = ({advanced} : ResultPageInterface) => {
  const [result, setResult] = useState<undefined | responseProp>(undefined)
  const [pData, setPData] = useState<undefined | pData>(undefined)
  const [isTr, setTr] = useState(false)
  const [load, setLoad] = useState(true)
  const [errorText, setError] = useState<string>('')
  const location = useLocation()

  function arrayToPkmnData(arr : string[]):[PkmnBaseStat,Modifiers[]] | -1{
    let pStat : PkmnBaseStat= {base:1,ev:0,iv:0,nature:'neutral',lvl:1}
    let pmod : Modifiers[] = []
    let base = arr[0].slice(3)
    if(!isNaN(Number(base)) && Number(base) <= 255 && Number(base) > 0){
      pStat.base = Number(base)//get base speed
      let ev = arr[1]
      if(!isNaN(Number(ev)) && Number(ev) <= 252 && Number(ev) >= 0){
        pStat.ev = Number(ev)//get ev
        let iv = arr[2]
        if(!isNaN(Number(iv)) && Number(iv) <= 31 && Number(iv) >= 0){
          pStat.iv = Number(iv)//get iv
          let lvl = arr[3]
          if(!isNaN(Number(lvl)) && Number(lvl) <= 100 && Number(lvl) > 0){
            pStat.lvl = Number(lvl)//get lvl
            let nature = arr[4]
            if(!!signsToNature(nature)){
              pStat.nature = signsToNature(nature)!//get nature
              for(let x = 5; x < arr.length; x++){
                if(!!modifiersExtendor(arr[x])){
                  pmod.push(modifiersExtendor(arr[x])!)
                }
              }
            }else{console.log(nature);return -1}
          }else{console.log(lvl);return -1}
        }else{console.log(iv);return -1}
      }else{console.log(ev);return -1}
    }else{console.log(base);return(-1)}
    return[pStat,pmod]
  }

  useEffect(() => {
    let p1prop = location.search.match(/p1=(.+)(?=&p2)/)
    let p2prop = location.search.match(/p2=(.+)(?=&tr)/)
    let trprop = location.search.match(/tr=(.+)/)
    if(!!p1prop && !!p2prop && !!trprop){//check if data existed
      let p1data = p1prop[0].split('_')
      let p2data = p2prop[0].split('_')
      let trActive = trprop[0].split('_').join('').slice(3)
      if(p1data.length >= 5 && p2data.length >=5){//check if minimum amount of data is given
        let p1props = arrayToPkmnData(p1data)
        let p2props = arrayToPkmnData(p2data)
        let trResult : boolean | -1 = -1
        if(trActive === 'true'){
          trResult = true
        }else if(trActive === 'false'){
          trResult = false
        }
        if(p1props === -1 || p2props === -1 || trResult === -1){//check for mismatch value
          setError('Property value mismatch!')
          console.log(p1props,p2props,trResult)
        }else{//analyze data
          let result = advancedModeAnalyzer(p1props[0],p2props[0],p1props[1],p2props[1],trResult)
          setTr(trResult)
          setResult({...result})
          setPData({
            p1: {...p1props[0]},
            p2: {...p2props[0]},
            p1mod:[...p1props[1]],
            p2mod:[...p2props[1]]
          })
        }
      }else{
        setError('Some properties was missing!')
      }
    }else{
      setError('Some properties was missing!')
    }
  },[location.search])

  useEffect(() => {
    function checkResult(){
      if(!result && !pData){
        setTimeout(() => {
          checkResult()
        }, 1000);
      }else{
        setLoad(false)
      }
    }

    if(load){
      if(!!result && !!pData){
        setLoad(false)
      }else{
        checkResult()
      }
    }
  }, [result])
  
  

  if(load){
    return(
      <LoadingPage errorText={errorText}/>
    )
  }else if(result && pData){
    return(
      <MainView className={style.resultPage}>
        <ResultCard advanced={advanced} trick_room={isTr} verdict={result.verdict} advProp={{p1baseSpeed :pData.p1.base}} p1mod={pData.p1mod}/>
        <StatCalcCard p1stats={pData.p1} p2stats={pData.p2} p1mods={pData.p1mod} p2mods={pData.p2mod} verdict={result.verdict} minBoost={result.min_boost} trick_room={isTr}/>
        <Button icon={<TriangleLeftIcon className={style.icon}/>} href={advanced ? '/advanced' : '/calc'} type='secondary' text="Back" style={{marginTop: '39px'}}/>
      </MainView>
    )
  }else{
    return(
      <LoadingPage errorText={'Failed to load component'}/>
    )
  }
}

export default ResultPage