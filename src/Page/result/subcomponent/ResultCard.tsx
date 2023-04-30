import Card from '../../../Components/Card/Card'
import BigInput from '../../../Components/Forms/BigInput/BigInput'
import ActiveAbilityIcon from '../../../Components/Icons/ActiveAbilityIcon'
import ChoiceScarfIcon from '../../../Components/Icons/ChoiceScarfIcon'
import IronBallIcon from '../../../Components/Icons/IronBallIcon'
import ParalyzeIcon from '../../../Components/Icons/ParalyzeIcon'
import TailwindIcon from '../../../Components/Icons/TailwindIcon'
import TrickRoomIcon from '../../../Components/Icons/TrickRoomIcon'
import ModifierContainer from '../../../Components/ModifierContainer/ModifierContainer'
import { Modifiers } from '../../../Utils/types'
import style from './../result.module.scss'


interface advResultProp{
  p1baseSpeed : number
}

interface simpleResultProp{
  p1Name : string
  p2Name : string
  p1ImageLink?: string
  p2ImageLink?: string
}

interface ResultCardProp{
  advanced: boolean
  verdict: 1 | 0 | -1
  trick_room: boolean
  p1mod: Modifiers[]
  advProp? : advResultProp
  simpleProp? : simpleResultProp 
}

const ResultCard = ({advanced, verdict, trick_room, p1mod, advProp,simpleProp} : ResultCardProp) =>{
  let verdictResult = {verdict:'', color:''}
  const VERDICT_COLOR = {
    '1': '#5994BF',
    '0': '#CBBA20',
    '-1': '#BB9262'
  }
  if(verdict === 1){
    verdictResult = {verdict: 'Faster', color: '#5994BF'}
  }else if(verdict === 0){
    verdictResult = {verdict: 'Tied', color: '#CBBA20'}
  }else if(verdict === -1){
    verdictResult = {verdict: 'Slower', color: '#BB9262'}
  }
  function renderModifiers(mods : Modifiers[], pnumber: 1|2, size: 's'|'m'){
    if(!mods || mods.length === 0){
      return(<></>)
    }else{
      return(
        mods.map((mod : Modifiers) =>{
          switch (mod) {
            case 'iron_ball':
              return(<ModifierContainer key={pnumber + mod} text="Iron Ball" className={style.modifierIcon} icon={<IronBallIcon />} size={size} />)
            case 'active_ability':
              return(<ModifierContainer key={pnumber + mod} text="Active Ability" className={style.modifierIcon} icon={<ActiveAbilityIcon />} size={size} />)
            case 'tailwind':
              return(<ModifierContainer key={pnumber + mod} text="Tailwind" className={style.modifierIcon} icon={<TailwindIcon />} size={size} />)
            case 'choice_scarf':
              return(<ModifierContainer key={pnumber + mod} text="Choice Scarf" className={style.modifierIcon} icon={<ChoiceScarfIcon />} size={size} />)
            case 'paralyze':
              return(<ModifierContainer key={pnumber + mod} text="Paralyze" className={style.modifierIcon} icon={<ParalyzeIcon />} size={size} />)
            default  : return<></>
          }
        })
      )
    }
  }

  return(
    <Card className={`${style.verdictCard} ${!advanced? style.simpleCard : ''}`}>
      {trick_room && <div className={style.trResult}>
        <p className={style.text}>in</p>
        <ModifierContainer text="Trick Room" icon={<TrickRoomIcon />} size='m' />
      </div>}
      {advanced ? (
        <h2 className={style.p1text}>{advProp?.p1baseSpeed} BSpd</h2>
      ):(
        <>
          <img src={simpleProp?.p1ImageLink} alt={`${simpleProp?.p1Name}'s sprite`} loading="lazy" className={`${style.pkmnSprite} ${style.p1Sprite}`} style={{marginBottom: 7}}/>
          <h2 className={style.p1text}>{simpleProp?.p1Name}</h2>
        </>
      )}
      {
        p1mod.length > 0 ? (
        <>
          <p className={style.text} style={{marginBottom: 6,marginTop: 2, fontSize: 14}}>with</p>
          <div className={style.modContainer}>
            {renderModifiers(p1mod, 1, 'm')}
          </div>
        </>):(<></>) 
      }
      <p className={style.text} style={{marginTop: '6px', marginBottom: '4px'}}>Is</p>
      <BigInput defaultValue={verdictResult.verdict} disabled color={verdictResult.color} className={style.bigInput} id="result"/>
      {
        !advanced && (
          <div className={style.p2Container}>
            <p className={style.text} style={{margin: 0}}>{verdict === 0 ? 'with' : 'than'}</p>
            <div className={style.sideSpriteContainer} style={{outlineColor: VERDICT_COLOR[`${verdict * -1}` as '1' | '0' | '-1']}}>
              <span className={style.tooltip}>{simpleProp?.p2Name}</span>
              <div className={style.imageMask}>
                <img src={simpleProp?.p2ImageLink} alt={`${simpleProp?.p2Name}'s sprite`} loading='lazy' className={`${style.pkmnSprite} ${style.p2Sprite}`} />
              </div>
            </div>
          </div>
        )
      }
    </Card>
  )
}

export default ResultCard