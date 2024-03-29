import Button from "../../Components/Button/Button"
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon"
import MainView from "../../Components/MainView/MainView"
import ResultCard from "./subcomponent/ResultCard"
import StatCalcCard from "./subcomponent/StatCalcCard"

import style from "./result.module.scss"
import { Modifiers, PkmnData } from "../../Utils/types"
import advancedModeAnalyzer, { advResponseProp } from "../../Utils/advancedModeAnalyzer"
import { useLayoutEffect, useRef, useState } from "react"
import LoadingPage from "../loading/Loading"
import { useLocation, useNavigate } from "react-router-dom"
import { modifiersExtendor, signsToNature } from "../../Utils/utils"

import StatTables from './subcomponent/StatTables'
import axios from "axios"
import speedAnalyzer, { responseProp } from "../../Utils/speedAnalyzer"
import AnalysesCard from "./subcomponent/AnalysesCard"
import RefreshIcon from "../../Components/Icons/RefreshIcon"

interface ResultPageInterface{
  advanced: boolean
}

interface pData{
  p1 : PkmnData
  p2 : PkmnData
  p1mod : Modifiers[]
  p2mod : Modifiers[]
}


const ResultPage = ({advanced} : ResultPageInterface) => {
  const [result, setResult] = useState<undefined | advResponseProp | responseProp>(undefined)
  const [load, setLoad] = useState(true)
  const [pData, setPData] = useState<undefined | pData>(undefined)
  const [isTr, setTr] = useState(false)
  const navigate = useNavigate()
  const [errorText, setError] = useState<string>('')
  const location = useLocation()
  const refURL = useRef(location.search)

  function getModifiersArrayFromUrlProp(arr:string[],startIndex:number):Modifiers[]{
    let pmods : Modifiers[] = []
    for(let x = startIndex; x < arr.length; x++){
      if(!!modifiersExtendor(arr[x])){
        pmods.push(modifiersExtendor(arr[x])!)
      }
    }
    return pmods
  }

  function arrayToPkmnData(arr : string[]):[PkmnData,Modifiers[]] | -1{
    let pStat : PkmnData= {base:1,ev:0,iv:0,nature:'neutral',lvl:1}
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
              pmod = getModifiersArrayFromUrlProp(arr, 5)
            }else{console.log(nature);return -1}
          }else{console.log(lvl);return -1}
        }else{console.log(iv);return -1}
      }else{console.log(ev);return -1}
    }else{console.log(base);return(-1)}
    return[pStat,pmod]
  }

  async function getPkmnInfo(name:string){
    return axios({
      method: 'get',
      url: `https://ismonfaster-default-rtdb.firebaseio.com/list/${name}.json`,
      headers:{
        Accept: '*/*'
      }
    })
  }

  function redirectReverseURL(){
    /**
     * Using the refURL to capture the initial URL when page loads.
     * to circumvent the possibility the user tinkered with with current URL and then pressing reverse
     */
    let p1prop = refURL.current.match(/p1=(.+)(?=&p2)/)
    let p2prop = refURL.current.match(/p2=(.+)(?=&tr)/)
    let trprop = refURL.current.match(/tr=(.+)/)
    
    if(!!p1prop && !!p2prop && !!trprop){
      let URL = `/smpresult?p1=${p2prop[1]}&p2=${p1prop[1]}&${trprop[0]}`
      setLoad(true)
      navigate(URL);
    }
  }

  useLayoutEffect(() => {
    refURL.current = location.search //updates ref to newest url
    if(advanced){
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
          }else{//analyze data
            let result = advancedModeAnalyzer(p1props[0],p2props[0],p1props[1],p2props[1],trResult)
            setTr(trResult)
            setResult({...result})
            setLoad(false)
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
    }else{
      let p1UrlProp = location.search.match(/p1=(.+)(?=&p2)/)
      let p2UrlProp = location.search.match(/p2=(.+)(?=&tr)/)
      let trUrlProp = location.search.match(/tr=(.+)/)
      if(!!p1UrlProp && !!p2UrlProp && !!trUrlProp){
        let trActive = trUrlProp[0].split('_').join('').slice(3)
        let trResult : boolean | -1 = -1
          if(trActive === 'true'){
            trResult = true
          }else if(trActive === 'false'){
            trResult = false
          }
          if(trResult !== -1){
            let p1data = p1UrlProp[1].split('_')
            let p2data = p2UrlProp[1].split('_')
            const p1Promise = getPkmnInfo(p1data[0])
            const p2Promise = getPkmnInfo(p2data[0])
            Promise.all([p1Promise,p2Promise]).then((values) => {
              let p1 : PkmnData = {name: decodeURIComponent(p1data[0]),base: parseInt(values[0].data.baseSpeed), ev: 255, iv: 31, nature: "neutral", lvl: 50, imgLink: values[0].data.image} 
              let p2 : PkmnData = {name: decodeURIComponent(p2data[0]),base: parseInt(values[1].data.baseSpeed), ev: 255, iv: 31, nature: "neutral", lvl: 50, imgLink: values[1].data.image} 
              let p1mods = getModifiersArrayFromUrlProp(p1data,1)
              let p2mods = getModifiersArrayFromUrlProp(p2data,1)
              let result = speedAnalyzer(p1.base,p2.base,p1mods,p2mods,!!trResult)
              setResult({...result})
              setTr(!!trResult)
              setLoad(false)
              setPData({
                p1: {...p1},
                p2: {...p2},
                p1mod: [...p1mods],
                p2mod: [...p2mods]
              })
            }).catch(err => console.log(err))
          }else{
            setError('Property value mismatch!')
          }
      }else{
        setError('Some properties was missing!')
      }
    }
  },[location.search])

  if(load){
    return(
      <LoadingPage errorText={errorText}/>
    )
  }else if(result && pData){
    if(advanced){      
      return(
        <MainView className={style.resultPage}>
          <ResultCard advanced={advanced} trick_room={isTr} verdict={result.verdict} advProp={{p1baseSpeed :pData.p1.base}} p1mod={pData.p1mod}/>
          <StatCalcCard p1stats={pData.p1} p2stats={pData.p2} p1mods={pData.p1mod} p2mods={pData.p2mod} verdict={result.verdict} minBoost={result.min_boost} trick_room={isTr}/>
          <Button icon={<TriangleLeftIcon className={style.icon}/>} href={advanced ? '/advanced' : '/calc'} type='secondary' text="Back" style={{marginTop: '39px'}}/>
        </MainView>
      )
    }else{
      return(
        <MainView className={style.resultPage}>
          <ResultCard advanced={advanced} trick_room={isTr} verdict={result.verdict} simpleProp={{p1Name: pData.p1.name!, p2Name: pData.p2.name! ,p1ImageLink: pData.p1.imgLink, p2ImageLink: pData.p2.imgLink}} p1mod={pData.p1mod}/>
          <AnalysesCard result={result as responseProp} p1data={pData.p1} p2data={pData.p2} p1mods={pData.p1mod} p2mods={pData.p2mod}/>
          <StatTables p1base={pData.p1.base} p2base={pData.p2.base} p1mods={pData.p1mod} p2mods={pData.p2mod} p1ImgLink={pData.p1.imgLink!} p2ImgLink={pData.p2.imgLink}/>
          <div style={{display: 'flex', marginTop: 39, marginBottom: 30}}>
            <Button icon={<TriangleLeftIcon className={style.icon}/>} href={advanced ? '/advanced' : '/calc'} type='secondary' text="Back"/>
            {advanced ? <></>:(
              <Button icon={<RefreshIcon className={style.iconStroke}/>} onClick={redirectReverseURL}  type='primary' text="Reverse Result" style={{marginLeft: '20px'}}/>
            )}
          </div>
        </MainView>
      )
    }
  }else{
    return(
      <LoadingPage errorText={'Failed to load component'}/>
    )
  }
}

export default ResultPage