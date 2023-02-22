import Button from "../../Components/Button/Button"
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon"
import MainView from "../../Components/MainView/MainView"
import ResultCard from "./subcomponent/ResultCard"
import StatCalcCard from "./subcomponent/StatCalcCard"

import style from "./result.module.scss"
import { Modifiers, PkmnBaseStat } from "../../Utils/types"
import advancedModeAnalyzer from "../../Utils/advancedModeAnalyzer"
import StatTables from "./subcomponent/StatTables"

interface ResultPageInterface{
  advanced: boolean
}


const ResultPage = ({advanced} : ResultPageInterface) => {
  let p1 : PkmnBaseStat= {
    base : 100,
    ev : 252,
    iv :31,
    nature: 'beneficial',
    lvl : 50
  }
  let p2 : PkmnBaseStat= {
    base : 80,
    ev : 252,
    iv :31,
    nature: 'neutral',
    lvl : 50
  }
  let p1mods : Modifiers[]=['tailwind','paralyze','active_ability']
  let p2mods : Modifiers[]=['choice_scarf']
  let result = advancedModeAnalyzer(p1, p2, p1mods, p2mods, false)
  return(
    <MainView className={style.resultPage}>
      <ResultCard advanced={advanced} trick_room={false} verdict={result.verdict} advProp={{p1baseSpeed :p1.base}}/>
      <StatCalcCard p1stats={p1} p2stats={p2} p1mods={p1mods} p2mods={p2mods} verdict={result.verdict} minBoost={result.min_boost} trick_room={false}/>
      <Button icon={<TriangleLeftIcon />} type='secondary' text="Back" style={{marginTop: '39px'}}/>
    </MainView>
  )
}

export default ResultPage