import Card from "../../../Components/Card/Card"
import ActiveAbilityIcon from "../../../Components/Icons/ActiveAbilityIcon"
import ChoiceScarfIcon from "../../../Components/Icons/ChoiceScarfIcon"
import IronBallIcon from "../../../Components/Icons/IronBallIcon"
import ParalyzeIcon from "../../../Components/Icons/ParalyzeIcon"
import TailwindIcon from "../../../Components/Icons/TailwindIcon"
import ModifierContainer from "../../../Components/ModifierContainer/ModifierContainer"
import statCalculator from "../../../Utils/statCalculator"
import { Modifiers, PkmnBaseStat } from "../../../Utils/types"
import { statBoostCalc } from "../../../Utils/utils"
import RenderModifiers from "../RenderModifier"


import style from './../result.module.scss'



interface StatCalcCardProp{
  p1stats: PkmnBaseStat
  p2stats: PkmnBaseStat
  p1mods : Modifiers[]
  p2mods : Modifiers[]
  verdict: 1 | 0 | -1
  minBoost: number
  trick_room: boolean
}
const StatCalcCard = ({p1stats,p2stats,p1mods,p2mods, verdict, minBoost, trick_room}:StatCalcCardProp) =>{
  let p1totalSpeed = 0;
  let p2totalSpeed= 0;
  p1totalSpeed = statCalculator(p1stats.base,p1stats.ev,p1stats.iv,p1stats.nature,p1stats.lvl,p1mods);
  p2totalSpeed = statCalculator(p2stats.base,p2stats.ev,p2stats.iv,p2stats.nature,p2stats.lvl,p2mods);


  function renderNature(nature : 'beneficial' | 'hindering' | 'neutral'){
    switch (nature) {
      case 'beneficial':
        return('+')
      case 'hindering':
        return('-')
      case 'neutral':
        return('')
      default:
        break;
    }
  }
  
  function verdictStyleApplictor(verdict : 1 | 0 | -1){
    switch (verdict) {
      case 1:
        return(style.faster)
      case 0:
        return(style.tied)
      case -1:
        return(style.slower)
      default:
        break;
    }
  }
  function renderAnalisys(verdict : 1 | 0 | -1){
    if(trick_room){
      switch (verdict) {
        case 1:
          if(minBoost <= 6){
            return(<Card.ListItem type="warning"><span className={style.p2text}><b>{p2stats.base} Bspd</b></span> will outslow with at least <b>-{minBoost}/ {(2/(2 + minBoost)).toFixed(2)}x Speed Boost <br />(<span className={style.p1text}>{p1totalSpeed} Spd</span> vs <span className={style.p2text}>{statBoostCalc(p2totalSpeed,minBoost * -1) } Spd</span>)</b></Card.ListItem>)
          }else if(minBoost > 6){
            return(<Card.ListItem type="safe"><span className={style.p2text}><b>{p2stats.base} Bspd</b></span> will not outslow with <b>-6/ {2/8}x Speed Boost <br />(<span className={style.p1text}>{p1totalSpeed} Spd</span> vs <span className={style.p2text}>{statBoostCalc(p2totalSpeed,-6) } Spd</span>)</b>  </Card.ListItem>)
          }
          break;
        case 0:
          return(<Card.ListItem type="warning"><span className={style.p1text}><b>{p1stats.base} Bspd</b></span> can outslow with at least <b>-{minBoost}/ {(2/(2 + minBoost)).toFixed(2)}x Speed Boost <br />(<span className={style.p1text}>{statBoostCalc(p1totalSpeed,(-1 * minBoost))} Spd</span> vs <span className={style.p2text}>{p2totalSpeed} Spd</span>)</b></Card.ListItem>)
        case -1:
          if(minBoost <= 6){
            return(<Card.ListItem type="warning"><span className={style.p1text}><b>{p1stats.base} Bspd</b></span> can outslow with at least <b>-{minBoost}/ {(2/(2 + minBoost)).toFixed(2)}x Speed Boost <br />(<span className={style.p1text}>{statBoostCalc(p1totalSpeed,(-1 * minBoost))} Spd</span> vs <span className={style.p2text}>{p2totalSpeed} Spd</span>)</b></Card.ListItem>)
          }else if(minBoost > 6){
            return(<Card.ListItem type="danger"><span className={style.p1text}><b>{p2stats.base} Bspd</b></span> can not outslow with <b>-6/ {2/8}x Speed Boost <br />(<span className={style.p1text}>{statBoostCalc(p1totalSpeed,-6)} Spd</span> vs <span className={style.p2text}>{p2totalSpeed} Spd</span>)</b>  </Card.ListItem>)
          }break;
        default:
          break;
      }
    }else{
      switch (verdict) {
        case 1:
          if(minBoost <= 6){
            return(<Card.ListItem type="warning"><span className={style.p2text}><b>{p2stats.base} Bspd</b></span> will outspeed with at least <b>+{minBoost}/ {(2 + minBoost)/2}x Speed Boost <br />(<span className={style.p1text}>{p1totalSpeed} Spd</span> vs <span className={style.p2text}>{statBoostCalc(p2totalSpeed,minBoost) } Spd</span>)</b></Card.ListItem>)
          }else if(minBoost > 6){
            return(<Card.ListItem type="safe"><span className={style.p2text}><b>{p2stats.base} Bspd</b></span> will not outspeed with <b>+6/ 4x Speed Boost <br />(<span className={style.p1text}>{p1totalSpeed} Spd</span> vs <span className={style.p2text}>{statBoostCalc(p2totalSpeed,6) } Spd</span>)</b>  </Card.ListItem>)
          }
          break;
        case 0:
          return(<Card.ListItem type="warning"><span className={style.p2text}><b>{p2stats.base} Bspd</b></span> will outspeed with at least <b>+{minBoost}/ {(2 + minBoost)/2}x Speed Boost <br />(<span className={style.p1text}>{p1totalSpeed} Spd</span> vs <span className={style.p2text}>{statBoostCalc(p2totalSpeed,minBoost) } Spd</span>)</b></Card.ListItem>)
        case -1:
          if(minBoost <= 6){
            return(<Card.ListItem type="warning"><span className={style.p1text}><b>{p1stats.base} Bspd</b></span> can outspeed with at least <b>+{minBoost}/ {(2 + minBoost)/2}x Speed Boost <br />(<span className={style.p1text}>{statBoostCalc(p1totalSpeed,minBoost)} Spd</span> vs <span className={style.p2text}>{p2totalSpeed} Spd</span>)</b></Card.ListItem>)
          }else if(minBoost > 6){
            return(<Card.ListItem type="danger"><span className={style.p1text}><b>{p2stats.base} Bspd</b></span> can not outspeed with <b>+6/ 4x Speed Boost <br />(<span className={style.p1text}>{statBoostCalc(p1totalSpeed,Math.min(minBoost,6))} Spd</span> vs <span className={style.p2text}>{p2totalSpeed} Spd</span>)</b>  </Card.ListItem>)
          }break;
        default:
          break;
      }
    }
  }
  return(
    <Card className={style.statCalcCard}>
      <Card.Header text="Stat Calculations" />
      <div className={style.calculationContainer}>
        <p className={style.title}>Base</p>
        <div className={style.statContainer}>
          <p className={`${style.p1text} ${style.bspd}`}>{p1stats.base} Bspd</p>
          <p className={style.stat}>{p1stats.ev}EV/{p1stats.iv}IV/Lvl.{p1stats.lvl}/{renderNature(p1stats.nature)}</p>
        </div>
        <p className={style.vs}>vs</p>
        <div className={style.statContainer}>
          <p className={`${style.p2text} ${style.bspd}`}>{p2stats.base} Bspd</p>
          <p className={style.stat}>{p2stats.ev}EV/{p2stats.iv}IV/Lvl.{p2stats.lvl}/{renderNature(p2stats.nature)}</p>
        </div>
        <div> </div>
        <div className={style.modifierContainer}>
          <RenderModifiers mods={p1mods} pnumber={1} size="s" />
        </div>
        <div></div>
        <div className={style.modifierContainer}>
          <RenderModifiers mods={p2mods} pnumber={2} size="s" />
        </div>
        <div></div>
        <div className={style.divider}></div>
        <p className={style.title}>Speed</p>
        <h3 className={`${style.totalSpeed} ${verdictStyleApplictor(verdict)}`}>{p1totalSpeed}</h3>
        <p> </p>
        <h3 className={`${style.totalSpeed} ${verdictStyleApplictor(verdict * -1 as 1 | 0 | -1)}`}>{p2totalSpeed}</h3>
      </div>
      {renderAnalisys(verdict)}
    </Card>
  )
}

export default StatCalcCard