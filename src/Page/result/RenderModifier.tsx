import ActiveAbilityIcon from "../../Components/Icons/ActiveAbilityIcon"
import ChoiceScarfIcon from "../../Components/Icons/ChoiceScarfIcon"
import IronBallIcon from "../../Components/Icons/IronBallIcon"
import ParalyzeIcon from "../../Components/Icons/ParalyzeIcon"
import TailwindIcon from "../../Components/Icons/TailwindIcon"
import ModifierContainer from "../../Components/ModifierContainer/ModifierContainer"
import { Modifiers } from "../../Utils/types"


import style from './result.module.scss'

interface RenderModProp{
  mods : Modifiers[]
  pnumber : 1|2
  size: 's'|'m'
}

function RenderModifiers({mods, pnumber, size}: RenderModProp){
  if(!mods || mods.length === 0){
    return(<></>)
  }else{
    return(
      <>
        {
          mods.map((mod : Modifiers) =>{
            switch (mod) {
              case 'iron_ball':
                return(<ModifierContainer key={pnumber + mod} text="Iron Ball (0.5x)" className={style.modifierIcon} icon={<IronBallIcon />} size={size} />)
              case 'active_ability':
                return(<ModifierContainer key={pnumber + mod} text="Active Ability (2x)" className={style.modifierIcon} icon={<ActiveAbilityIcon />} size={size} />)
              case 'tailwind':
                return(<ModifierContainer key={pnumber + mod} text="Tailwind (2x)" className={style.modifierIcon} icon={<TailwindIcon />} size={size} />)
              case 'choice_scarf':
                return(<ModifierContainer key={pnumber + mod} text="Choice Scarf (1.5x)" className={style.modifierIcon} icon={<ChoiceScarfIcon />} size={size} />)
              case 'paralyze':
                return(<ModifierContainer key={pnumber + mod} text="Paralyze (0.5x)" className={style.modifierIcon} icon={<ParalyzeIcon />} size={size} />)
              default  : return<></>
            }
          })
        }
      </>
    )
  }
}

export default RenderModifiers