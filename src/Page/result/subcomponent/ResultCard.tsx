import Card from '../../../Components/Card/Card'
import BigInput from '../../../Components/Forms/BigInput/BigInput'
import TrickRoomIcon from '../../../Components/Icons/TrickRoomIcon'
import ModifierContainer from '../../../Components/ModifierContainer/ModifierContainer'
import style from './../result.module.scss'


interface advResultProp{
  p1baseSpeed : number
}

interface simpleResultProp{
  p1Name : string
  p1ImageLink?: string
  p2ImageLink?: string
}

interface ResultCardProp{
  advanced: boolean
  verdict: 1 | 0 | -1
  trick_room: boolean
  advProp? : advResultProp
  simpleProp? : simpleResultProp 
}
const ResultCard = ({advanced, verdict, trick_room,advProp,simpleProp} : ResultCardProp) =>{
  function renderVerdict(verdict : 1 | 0 | -1){
    switch (verdict) {
      case(1):
        return(<BigInput defaultValue="Faster" disabled color="#5994BF" className={style.bigInput}/>)
      case(0):
      return(<BigInput defaultValue="Tie" disabled color="#CBBA20" className={style.bigInput}/>)
      case(-1):
      return(<BigInput defaultValue="Slower" disabled color="#BB9262" className={style.bigInput}/>)
    
      default:
        break;
    }
  }

  return(
    <Card className={style.verdictCard}>
      {trick_room && <div className={style.trResult}>
        <p>in</p>
        <ModifierContainer text="Trick Room" icon={<TrickRoomIcon />} size='m' />
      </div>}
      <h2 className={style.p1text}>{advProp?.p1baseSpeed} BSpd</h2>
      <p className={style.text}>is</p>
      {renderVerdict(verdict)}
    </Card>
  )
}

export default ResultCard