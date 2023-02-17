import Card from '../../../Components/Card/Card'
import BigInput from '../../../Components/Forms/BigInput/BigInput'
import TrickRoomIcon from '../../../Components/Icons/TrickRoomIcon'
import ModifierContainer from '../../../Components/ModifierContainer/ModifierContainer'
import style from './../result.module.scss'


interface ResultCardProp{
  advanced: boolean
}
const ResultCard = ({advanced} : ResultCardProp) =>{
  return(
    <Card className={style.verdictCard}>
      <div className={style.trResult}>
        <p>in</p>
        <ModifierContainer text="Trick Room" icon={<TrickRoomIcon />} size='m' />
      </div>
      <h2 className={style.p1text}>XXX BSpd</h2>
      <p className={style.text}>is</p>
      <BigInput defaultValue="Faster" disabled color="#5994BF" className={style.bigInput}/>
    </Card>
  )
}

export default ResultCard