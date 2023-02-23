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
  let verdictResult = {verdict:'', color:''}
  if(verdict === 1){
    verdictResult = {verdict: 'Faster', color: '#5994BF'}
  }else if(verdict === 0){
    verdictResult = {verdict: 'Tied', color: '#CBBA20'}
  }else if(verdict === -1){
    verdictResult = {verdict: 'Slower', color: '#BB9262'}
  }

  return(
    <Card className={style.verdictCard}>
      {trick_room && <div className={style.trResult}>
        <p>in</p>
        <ModifierContainer text="Trick Room" icon={<TrickRoomIcon />} size='m' />
      </div>}
      <h2 className={style.p1text}>{advProp?.p1baseSpeed} BSpd</h2>
      <p className={style.text}>is</p>
      <BigInput defaultValue={verdictResult.verdict} disabled color={verdictResult.color} className={style.bigInput}/>
    </Card>
  )
}

export default ResultCard