import { ReactNode } from "react"
import Card from "../../../Components/Card/Card"
import { responseProp } from "../../../Utils/speedAnalyzer"
import statCalculator from "../../../Utils/statCalculator"
import { Modifiers, PkmnData } from "../../../Utils/types"
import { pkmnSpeedStateConverter, pkmnStatSpreadConverter } from "../../../Utils/utils"

import style from './../result.module.scss'

interface AnalysesProp {
  p1data: PkmnData
  p2data: PkmnData
  p1mods: Modifiers[]
  p2mods: Modifiers[]
  result: responseProp
}

const AnalysesCard = ({ p1data, p2data, p1mods, p2mods, result }: AnalysesProp) => {
  console.log(result)

  function renderAnalyses(verdict: 1 | 0 | -1) {
    let listItem: ReactNode[] = []
    let maxp1Speed = statCalculator(p1data.base, 252, 31, "beneficial", 50, p1mods);
    let maxp2Speed = statCalculator(p2data.base, 252, 31, "beneficial", 50, p2mods);
    let minp1Speed = statCalculator(p1data.base, 0, 0, "hindering", 50, p1mods);
    let minp2Speed = statCalculator(p2data.base, 0, 0, "hindering", 50, p2mods);
    if (result.inTrickRoom) {
      if(verdict === 1){
        listItem.push(
          <Card.ListItem type='safe' key="faster">
            In <b>Trick Room</b> <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.faster}>faster</b> than <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p2text}>{p2data.name}</b>{` `}
            (<b className={style.p1text}>{minp1Speed}</b> vs <b className={style.p2text}>{minp2Speed}</b> )
          </Card.ListItem>
        )
        listItem.push(
          <Card.ListItem key={'minev'} type="safe">
            <b className={style.p1text}>{p1data.name}</b> can outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(result.min_stat[0].opponentState!)}>{pkmnSpeedStateConverter(result.min_stat[0].opponentState!)}</span> <b className={style.p2text}>{p2data.name}</b>
            {` with`} <b>{result.min_stat[0].minEV}</b> EV, <b>{result.min_stat[0].minIV}</b> IV and a <b>{result.min_stat[0].nature}</b> nature
          </Card.ListItem>
        )
        listItem.push(
          <Card.ListItem type={result.min_boost <= 6 ? 'warning' : 'safe'} key="min_boosr">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>{pkmnSpeedStateConverter('min--')}</span> <b className={style.p2text}>{p2data.name}</b> {result.min_boost <= 6 ? ' can ' : " can't "} outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p1text}>{p1data.name}</b> with <b>-{`${Math.min(result.min_boost, 6)}/x${(2 / (Math.min(result.min_boost, 6) + 2)).toFixed(2)}`}
            </b> Speed Boost (<b className={style.p2text}>{statCalculator(p2data.base, 0, 0, 'hindering', 50, p2mods, Math.min(result.min_boost, 6) * -1 )}</b> vs <b className={style.p1text}>{minp1Speed}</b>)
          </Card.ListItem>
        )
      }else if(verdict === 0){
        listItem.push(
          <Card.ListItem type='warning' key="tie">
            In <b>Trick Room</b> <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.tied}>tied</b> with <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p2text}>{p2data.name}</b>{` `}
            (<b className={style.p1text}>{minp1Speed}</b> vs <b className={style.p2text}>{minp2Speed}</b> )
          </Card.ListItem>
        )
      }else if(verdict === -1){
        listItem.push(
          <Card.ListItem type='danger' key="slower">
            In <b>Trick Room</b> <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.slower}>slower</b> than <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p2text}>{p2data.name}</b>{` `}
            (<b className={style.p1text}>{minp1Speed}</b> vs <b className={style.p2text}>{minp2Speed}</b> )
          </Card.ListItem>
        )
        if(result.min_stat[0].opponentState !== 'win'){
          
        }
        listItem.push(
          <Card.ListItem type={result.min_boost >= -6 ? 'warning' : 'safe'} key="min_boosr">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>{pkmnSpeedStateConverter('min--')}</span> <b className={style.p1text}>{p1data.name}</b> {result.min_boost <= 6 ? ' can ' : " can't "} outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('min--')}>MinEV&IV-</span> <b className={style.p2text}>{p2data.name}</b> with <b>-{`${Math.min(result.min_boost, 6)}/x${(2 / (Math.min(result.min_boost, 6) + 2)).toFixed(2)}`}
            </b> Speed Boost (<b className={style.p1text}>{statCalculator(p1data.base, 0, 0, 'hindering', 50, p2mods, Math.min(result.min_boost, 6) * -1 )}</b> vs <b className={style.p2text}>{minp2Speed}</b>)
          </Card.ListItem>
        )
      }

    } else {
      if (verdict === 1) {
        listItem.push(
          <Card.ListItem type='safe' key="faster">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.faster}>faster</b> than <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p2text}>{p2data.name}</b>{` `}
            (<b className={style.p1text}>{maxp1Speed}</b> vs <b className={style.p2text}>{maxp2Speed}</b> )
          </Card.ListItem>
        )

        listItem.push(
          <Card.ListItem key={'minev'} type="safe">
            <b className={style.p1text}>{p1data.name}</b> can outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(result.min_stat[0].opponentState!)}>{pkmnSpeedStateConverter(result.min_stat[0].opponentState!)}</span> <b className={style.p2text}>{p2data.name}</b>
            {` with at least`} <b>{result.min_stat[0].minEV}</b> EV and a <b>{result.min_stat[0].nature}</b> nature
            {result.min_stat.length > 1 ? (
              <>
                {` or `}<b>{result.min_stat[1].minEV}</b> EV and <b>{result.min_stat[1].nature}</b> nature
              </>
            ) : ''}
          </Card.ListItem>
        )
        let outspeedNature = 'max+'
        if (result.min_boost <= 6 && statCalculator(p2data.base, 252, 31, "neutral", 50, p2mods, result.min_boost) > maxp1Speed) {
          outspeedNature = 'max'
        }
        listItem.push(
          <Card.ListItem type={result.min_boost <= 6 ? 'warning' : 'safe'} key="min_boosr">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(outspeedNature)}>{pkmnSpeedStateConverter(outspeedNature)}</span> <b className={style.p2text}>{p2data.name}</b> {result.min_boost <= 6 ? ' can ' : " can't "} outspeed <b className={style.p1text}>{p1data.name}</b> with <b>+{`${Math.min(result.min_boost, 6)}/x${(Math.min(result.min_boost, 6) + 2) / 2}`}
            </b> Speed Boost (<b className={style.p2text}>{statCalculator(p2data.base, 252, 31, outspeedNature === 'max+' ? 'beneficial' : 'neutral', 50, p2mods, Math.min(result.min_boost, 6))}</b> vs <b className={style.p1text}>{maxp1Speed}</b>)

          </Card.ListItem>
        )
      } else if (verdict === 0) {//// If pkmn1 spd === pkmn2 spd
        listItem.push(
          <Card.ListItem type='warning' key="tied">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.tied}>tied</b> with <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p2text}>{p2data.name}</b>
          </Card.ListItem>
        )
        listItem.push(
          <Card.ListItem type='warning' key="tied">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p1text}>{p1data.name}</b> can outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max')}>Max EV</span> <b className={style.p2text}>{p2data.name}</b> with at least <b>{result.min_stat[0].minEV} EV</b>
          </Card.ListItem>
        )
      } else if (verdict === -1) {/// if Pkmn1 slower than Pkmn 2
        listItem.push(
          <Card.ListItem type='danger' key="slower">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p1text}>{p1data.name}</b> is <b className={style.slower}>slower</b> than <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p2text}>{p2data.name}</b>{` `}
            (<b className={style.p1text}>{maxp1Speed}</b> vs <b className={style.p2text}>{maxp2Speed}</b> )
          </Card.ListItem>
        )
        if (result.min_stat[0].opponentState === 'win') {
          listItem.push(
            <Card.ListItem key={'minev'} type="danger">
              <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p1text}>{p1data.name}</b> can't outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(result.min_stat[0].opponentState!)}>{pkmnSpeedStateConverter(result.min_stat[0].opponentState!)}</span> <b className={style.p2text}>{p2data.name}</b>.
              {` `}(<b className={style.p1text}>{maxp1Speed}</b> vs <b className={style.p2text}>{statCalculator(p2data.base, 0, 31, 'neutral', 50, p2mods)}</b>)
            </Card.ListItem>
          )
        } else {
          listItem.push(
            <Card.ListItem key={'minev'} type="warning">
              <b className={style.p1text}>{p1data.name}</b> can outspeed if <b className={style.p2text}>{p2data.name}</b> has a <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(result.min_stat[0].opponentState!)}>{pkmnSpeedStateConverter(result.min_stat[0].opponentState!)}</span>
              {` and`} <b className={style.p1text}>{p1data.name}</b> has at least <b>{result.min_stat[0].minEV}</b> EV and a <b>{result.min_stat[0].nature}</b> nature
              {result.min_stat.length > 1 ? (
                <>
                  {` or `}<b>{result.min_stat[1].minEV}</b> EV and <b>{result.min_stat[1].nature}</b> nature
                </>
              ) : ''}
            </Card.ListItem>
          )
        }
        let outspeedNature = 'max+'
        if (result.min_boost <= 6 && statCalculator(p1data.base, 252, 31, "neutral", 50, p1mods, result.min_boost) > maxp2Speed) {
          outspeedNature = 'max'
        }
        listItem.push(
          <Card.ListItem type={result.min_boost <= 6 ? 'warning' : 'danger'} key="min_boost_slower">
            <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter(outspeedNature)}>{pkmnSpeedStateConverter(outspeedNature)}</span> <b className={style.p1text}>{p1data.name}</b> {result.min_boost <= 6 ? ' can ' : " can't "} outspeed <span className={style.statTooltip} data-tooltip={pkmnStatSpreadConverter('max+')}>Max EV+</span> <b className={style.p2text}>{p2data.name}</b> with <b>+{`${Math.min(result.min_boost, 6)}/x${(Math.min(result.min_boost, 6) + 2) / 2}`}
            </b> Speed Boost (<b className={style.p1text}>{statCalculator(p1data.base, 252, 31, outspeedNature === 'max+' ? 'beneficial' : 'neutral', 50, p1mods, Math.min(result.min_boost, 6))}</b> vs <b className={style.p2text}>{maxp2Speed}</b>)

          </Card.ListItem>
        )
      }
    }
    return listItem
  }



  return (
    <Card className={style.analysesCard}>
      <Card.Header text="Analyses" />
      {
        renderAnalyses(result.verdict)
      }
    </Card>
  )
}

export default AnalysesCard