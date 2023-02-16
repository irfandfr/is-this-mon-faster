import Button from "../../Components/Button/Button"
import Card from "../../Components/Card/Card"
import BigInput from "../../Components/Forms/BigInput/BigInput"
import ActiveAbilityIcon from "../../Components/Icons/ActiveAbilityIcon"
import ChoiceScarfIcon from "../../Components/Icons/ChoiceScarfIcon"
import IronBallIcon from "../../Components/Icons/IronBallIcon"
import ParalyzeIcon from "../../Components/Icons/ParalyzeIcon"
import TailwindIcon from "../../Components/Icons/TailwindIcon"
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon"
import TrickRoomIcon from "../../Components/Icons/TrickRoomIcon"
import MainView from "../../Components/MainView/MainView"
import ModifierContainer from "../../Components/ModifierContainer.tsx/ModifierContainer"

import style from "./result.module.scss"

const ResultPage = () => {
  return(
    <MainView className={style.resultPage}>
      <Card className={style.verdictCard}>
        <div className={style.trResult}>
          <p>in</p>
          <ModifierContainer text="Trick Room" icon={<TrickRoomIcon />} size='m' />
        </div>
        <h2 className={style.p1text}>XXX BSpd</h2>
        <p className={style.text}>is</p>
        <BigInput defaultValue="Faster" disabled color="#5994BF" className={style.bigInput}/>
      </Card>
      <Card className={style.statCalcCard}>
        <Card.Header text="Stat Calculations" />
        <div className={style.calculationContainer}>
          <p className={style.title}>Base</p>
          <div className={style.statContainer}>
            <p className={`${style.p1text} ${style.bspd}`}>102 Bspd</p>
            <p>252EV/31IV/</p>
          </div>
          <p className={style.vs}>vs</p>
          <div className={style.statContainer}>
            <p className={`${style.p2text} ${style.bspd}`}>102 Bspd</p>
            <p>252EV/31IV/+</p>
          </div>
          <div> </div>
          <div className={style.modifierContainer}>
            <ModifierContainer text="Tailwind" className={style.modifierIcon} icon={<TailwindIcon />} size='s' />
            <ModifierContainer text="Active Ability" className={style.modifierIcon} icon={<ActiveAbilityIcon />} size='s' />
            <ModifierContainer text="Paralyze" className={style.modifierIcon} icon={<ParalyzeIcon />} size='s' />
            <ModifierContainer text="Choice Scarf" className={style.modifierIcon} icon={<ChoiceScarfIcon />} size='s' />
          </div>
          <div></div>
          <div className={style.modifierContainer}>
            <ModifierContainer text="Choice Scarf" className={style.modifierIcon} icon={<TailwindIcon />} size='s' />
            <ModifierContainer text="Iron Ball" className={style.modifierIcon} icon={<IronBallIcon />} size='s' />
          </div>
          <div></div>
          <div className={style.divider}></div>
          <p className={style.title}>Speed</p>
          <h3 className={`${style.totalSpeed} ${style.faster}`}>200</h3>
          <p> </p>
          <h3 className={`${style.totalSpeed} ${style.slower}`}>102</h3>
        </div>
        <Card.ListItem type="warning"><span className={style.p2text}><b>30 Bspd</b></span> will outspeed with at least <b>+1/ 1.5x Speed Boost (<span className={style.p1text}>200 Spd</span> vs <span className={style.p2text}>234 Spd</span>)</b>  </Card.ListItem>
      </Card>
      <Button icon={<TriangleLeftIcon />} type='secondary' text="Back" style={{marginTop: '39px'}}/>
    </MainView>
  )
}

export default ResultPage