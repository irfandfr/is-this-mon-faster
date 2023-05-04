import { useRef } from "react"
import Card from "../../../Components/Card/Card"
import statCalculator from "../../../Utils/statCalculator"
import { Modifiers } from "../../../Utils/types"
import RenderModifiers from "../RenderModifier"

import style from './../result.module.scss'

interface StatTablesProp{
  p1base: number
  p2base: number
  p1mods: Modifiers[]
  p2mods: Modifiers[]
  p1ImgLink?: string
  p2ImgLink?: string
}

const StatTables = ({p1base,p2base,p1mods,p2mods,p2ImgLink,p1ImgLink}:StatTablesProp) =>{
  let tableContent : {title:string, ev: number, iv: number, nature: 'beneficial'|'neutral'|'hindering'}[]=[
    {title: 'MaxEV+', ev: 252, iv:31, nature:'beneficial'},
    {title: 'MaxEV', ev: 252, iv:31, nature:'neutral'},
    {title: 'MinEV+', ev: 0, iv:31, nature:'beneficial'},
    {title: 'MinEV', ev: 0, iv:31, nature:'neutral'},
    {title: 'MinEVIV', ev: 0, iv:0, nature:'neutral'},
    {title: 'MinEVIV-', ev: 0, iv:0, nature:'hindering'},
  ]

  function rendertables(){
    return(
      tableContent.map((content) => {
        return(
          <tr key={content.title}>
              <th>{content.title}</th>
              <th>{statCalculator(p1base,content.ev,content.iv,content.nature,50,p1mods)}</th>
              <th>{statCalculator(p2base,content.ev,content.iv,content.nature,50,p2mods)}</th>
          </tr>
        )
      })
    )
  }
  return(
    <Card className={style.tableCard}>
      <Card.Header text="Stat Calculations" />
      <table className={style.statTable}>
        <tbody>
          <tr>
            <th></th>
            <th>
              <div className={style.pkmnContainer}>
                <img className={style.sprite} src={p1ImgLink} alt="Pokemon1's Sprite" loading="lazy" />
                <RenderModifiers mods={p1mods} pnumber={1} size='s'/>
              </div>
            </th>
            <th>
              <div  className={style.pkmnContainer}>
                <img className={style.sprite} src={p2ImgLink} alt="Pokemon1's Sprite" loading="lazy" />
                <RenderModifiers mods={p2mods} pnumber={2} size='s'/>
              </div>
            </th>
          </tr>
          <tr>
            <th>Base Speed</th>
            <th className={style.p1text} style={{fontWeight: '600'}}>{p1base}</th>
            <th className={style.p2text} style={{fontWeight: '600'}}>{p2base}</th>
          </tr>
          {rendertables()}
        </tbody>
      </table>
    </Card>
  )
}

export default StatTables