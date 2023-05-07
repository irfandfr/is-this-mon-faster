import React, { lazy, Suspense, useEffect, useReducer, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//import component
import InputGroup from "../../Components/InputGroup/InputGroup"
import MainView from "../../Components/MainView/MainView"
import Modal from "../../Components/Modal/Modal"
import ModifierContainer from "../../Components/ModifierContainer/ModifierContainer"
import Button from "../../Components/Button/Button"

//import utils
import { modifiersAbbreviator, natureToSigns } from "../../Utils/utils"

//import icon
import TrickRoomIcon from "../../Components/Icons/TrickRoomIcon"
import TailwindIcon from "../../Components/Icons/TailwindIcon"
import ParalyzeIcon from "../../Components/Icons/ParalyzeIcon"
import IronBallIcon from "../../Components/Icons/IronBallIcon"
import ActiveAbilityIcon from "../../Components/Icons/ActiveAbilityIcon"
import ChoiceScarfIcon from "../../Components/Icons/ChoiceScarfIcon"
import RefreshIcon from "../../Components/Icons/RefreshIcon"

//import interface
import { SelectionProp } from "../../Components/InputGroup/InputGroup"

//import style
import style from './calcUI.module.scss'
import LoadingPage from "../loading/Loading"
import { PkmnData } from "../../Utils/types"


const PkmnAdvancedSelector = lazy(() => import("./subComponent/PkmnAdvancedSelector"));
const PkmnSimpleSelector = lazy(() => import("./subComponent/PkmnSimpleSelector"));




enum InitialStateKey {
  active_ability = 'active_ability',
  tailwind = 'tailwind',
  paralyze = 'paralyze',
  choice_scarf = 'choice_scarf',
  iron_ball = 'iron_ball'
}

export interface ActionType {
  type: keyof typeof InitialStateKey
  payload: any
}

type initialState = {
  [keys in InitialStateKey]: SelectionProp
}

interface CalculatorProp {
  advanced?: boolean
}

const CalculatorUI = ({ advanced }: CalculatorProp) => {
  const location = useLocation()
  const initialState = {
    active_ability: { icon: <ActiveAbilityIcon />, title: 'Active Ability', id: 'active_ability', value: 'ab', check: false },
    tailwind: { icon: <TailwindIcon />, title: 'Tailwind', id: 'tailwind', value: 'tw', check: false },
    paralyze: { icon: <ParalyzeIcon />, title: 'Paralyze', id: 'paralyze', value: 'pr', check: false },
    choice_scarf: { icon: <ChoiceScarfIcon />, title: 'Choice Scarf', id: 'choice_scarf', value: 'cs', check: false },
    iron_ball: { icon: <IronBallIcon />, title: 'Iron Ball', id: 'iron_ball', value: 'ib', check: false },
  }
  const initialPkmnData: PkmnData = {
    base: 100,
    lvl: 50,
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
    { value: 'neutral', name: 'Neutral' },
    { value: 'beneficial', name: 'Beneficial' },
    { value: 'hindering', name: 'Hindering' },
  ]

  function reducer(state: initialState, action: ActionType) {
    let radioGroup = ['iron_ball', 'choice_scarf']
    switch (action.type) {
      default: {
        let stateValue = state[action.type];
        let updatedCopy = {
          ...state,
          [action.type]: { ...stateValue, check: !stateValue.check }
        }
        //if held item group are selected, set the others to false
        if (radioGroup.findIndex((e) => e === action.type) >= 0) {
          let currentIndex = radioGroup.findIndex((e) => e === action.type)
          let i = 1 - currentIndex
          updatedCopy[radioGroup[i] as keyof initialState].check = false
        }
        return updatedCopy
      }
    }
  }
  const [p1Stat, setp1Stat] = useState<PkmnData>(initialPkmnData)
  const [p2Stat, setp2Stat] = useState<PkmnData>(initialPkmnData)
  const [selectGroupState, setGroupState] = useState(initialSelectState)
  const [stateP1, dispatch1] = useReducer(reducer, initialState)
  const [stateP2, dispatch2] = useReducer(reducer, initialState)
  const [stateTrickRoom, setTRstate] = useState({ trick_room: { icon: <TrickRoomIcon />, title: 'Trick Room', id: 'trick_room', value: 'tr', check: false } })
  const GUIDE_DATA = [
    { icon: <ActiveAbilityIcon />, title: 'Active Ability', description: 'Ability that doubles Speed under certain conditions such as weathers (Swift Swim), consuming item(Unburden), etc. (x2)' },
    { icon: <TailwindIcon />, title: 'Tailwind', description: 'A move that doubles the user’s and their allies Speed (x2)' },
    { icon: <ParalyzeIcon />, title: 'Paralyze', description: 'A status effect that reduces Speed by 50%(x0.5)' },
    { icon: <ChoiceScarfIcon />, title: 'Choice Scarf', description: 'A held item that increases the user Speed by 50%(x1.5)' },
    { icon: <IronBallIcon />, title: 'Iron Ball', description: 'A held item that decreases the user’s Speed by 50%(x0.5)' },
    { icon: <TrickRoomIcon />, title: 'Trick Room', description: 'A move that affects the field, the move makes slower Pokemon go first.' },
  ]
  const [modalOpen, setModal] = useState(false)


  const navigate = useNavigate()

  function setPkmn1Stat(pkmn:PkmnData){
    setp1Stat(pkmn)
  }
  function setPkmn2Stat(pkmn:PkmnData){
    setp2Stat(pkmn)
  }

  function setP1Value(id: string, value: string | number) {
    setp1Stat({
      ...p1Stat,
      [id]: value
    })
  }

  function setP2Value(id: string, value: string | number) {
    setp2Stat({
      ...p2Stat,
      [id]: value
    })
  }
  function getTrValue() {
    return Object.entries(stateTrickRoom).map((value: [string, SelectionProp]) => {
      return value[1].check
    })
  }
  function trToggle() {
    let value = stateTrickRoom.trick_room
    setTRstate({
      trick_room: { ...value, check: !value.check }
    })
  }

  //compile pokemon stats and modifiers into one array
  function extractData(pkmn: PkmnData, mods: initialState, mode: 'simple' | 'advanced') {
    let pStats: any[] = []
    if(mode === 'advanced'){
      pStats = [pkmn.base, pkmn.ev, pkmn.iv, pkmn.lvl, natureToSigns(pkmn.nature)]
    }else if(mode === 'simple'){
      pStats = [encodeURIComponent(`${pkmn.name}`)]
    }
    Object.entries(mods).forEach((value: [string, SelectionProp]) => {
      if (value[1].check) {
        pStats.push(modifiersAbbreviator(value[0] as keyof typeof InitialStateKey))
      }
    })
    return pStats
  }

  //function to analyze all the data and redirect to appropriate page
  function toResultPage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.currentTarget.disabled = true;
    setGroupState({
      p1group: true,
      p2group: true,
      trstate: true
    })
    setTimeout(() => {//wait incase for debounce function
      let tr = getTrValue().toString()
      let p1data;
      let p2data;
      if(advanced){
        p1data = extractData(p1Stat, stateP1, 'advanced');
        p2data = extractData(p2Stat, stateP2, 'advanced')
      }else{
        p1data = extractData(p1Stat, stateP1, 'simple');
        p2data = extractData(p2Stat, stateP2, 'simple')
      }
      let url = `/${advanced ? 'adv': 'smp'}result?p1=${p1data.join('_')}&p2=${p2data.join('_')}&tr=${tr}`
      navigate(url)
    }, 800);
  }

  useEffect(() => {
    document.title = `isMonFaster | ${location.pathname === '/calc' ? 'Simple Compare' : 'Advanced Compare'}`
  },[location])

  return (
    <MainView className={style.calcUIContainer}>
      <Modal open={modalOpen} closeIcon={true} onClose={() => setModal(false)}>
        <>
          <Modal.Header text="Guide" />
          <div className={style.guideContainer}>
            {
              GUIDE_DATA.map((data) => {
                return (
                  <div className={style.guideItem} key={data.title}>
                    <ModifierContainer icon={data.icon} size="l" />
                    <div className={style.guideDesc}>
                      <h5>{data.title + ':'}</h5>
                      <p>{data.description}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </>
      </Modal>
      <div className={style.pageHeader}>
        <h3 className={style.text}>Is</h3>
        <button className={style.faqButton} onClick={() => setModal(true)}>?</button>
      </div>
      {
        advanced ? (
          <Suspense fallback={<LoadingPage errorText="" />}>
            <PkmnAdvancedSelector setP1Value={setP1Value} setP2Value={setP2Value} dispatch1={dispatch1} dispatch2={dispatch2} stateP1={stateP1} selectGroupState={selectGroupState} stateP2={stateP2} natures={NATURE_OPTIONS} />
          </Suspense>
        ):(
          <Suspense fallback={<LoadingPage errorText="" />}>
            <PkmnSimpleSelector sprite1={p1Stat.imgLink} sprite2={p2Stat.imgLink} setP1Stat={setPkmn1Stat} setP2Stat={setPkmn2Stat} dispatch1={dispatch1} dispatch2={dispatch2} stateP1={stateP1} selectGroupState={selectGroupState} stateP2={stateP2}/>
          </Suspense>
        )
      }
      
      <div className={style.pContainer}>
        <h5 className={style.text}>in</h5>
        <InputGroup groupList={stateTrickRoom} onClick={trToggle} disabled={selectGroupState.trstate} />
      </div>
      <Button icon={<RefreshIcon className={style.refreshIcon} />} onClick={toResultPage} disabled={advanced ? false : !(!!p1Stat.name && !!p2Stat.name)} text="Analyze" type="primary" style={{ marginTop: '30px' }} />
      {advanced ? (
        <a className={style.link} href="/calc">Switch to Simple</a>
      ) : (
        <a className={style.link} href="/advanced">Switch to Advanced</a>
      )}
    </MainView>
  )
}

export default CalculatorUI