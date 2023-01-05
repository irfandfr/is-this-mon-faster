import baseStatCalculator from "./baseStatCalculator";
import evExtractor from "./evExtractor";

interface responseProp{
  verdict : 1 | 0 | -1
  message: string[]
}

export enum statusTypes{
  'tailwind',
  'paralyzed',
  'choice_scarf',
  'active_ability'
}

interface speedProps{
  base_speed1: number
  base_speed2: number
  status1?: statusTypes[]
  status2?: statusTypes[]
  inTrickRoom?: boolean
}



const speedAnalyzer = ({base_speed1,base_speed2,status1,status2,inTrickRoom} : speedProps) =>{
  const FASTER = 1;
  const TIE = 0
  const SLOWER = -1; 

  let resp : responseProp = {
    verdict: 0,
    message: []
  }

  /**
   * function to calculate status using the baseStatCalculator function as a base
   *  and multipled with the current status affecting the pokemon
   */
  function calculateStat(base_speed: number, ev : number, iv: number, nature : 'beneficial'| 'neutral' | 'hindering', status? : statusTypes[]){
    const TAILWIND_MULTIPLIER = 2;
    const PARALYZE_MULTIPLIER = 0.5;
    const CHOICE_SCARF_MULTILPIER = 1.5;
    const ABILITY_MULTIPLIER = 2;
    let stat : number;

    stat = baseStatCalculator(base_speed, iv, ev, nature).stat
    if(!!status && status.length > 0 ){
      status.forEach( entry => {
        switch (entry) {
          case statusTypes.tailwind:
            stat = stat * TAILWIND_MULTIPLIER
            break;
          case statusTypes.choice_scarf:
            stat = Math.floor(stat * CHOICE_SCARF_MULTILPIER)
            break;
          case statusTypes.active_ability:
            stat = stat * ABILITY_MULTIPLIER
            break;
          case statusTypes.paralyzed:
            stat = Math.floor(stat * PARALYZE_MULTIPLIER)
            break;
          default:
            break;
        }
      });
    }

    return stat
  }
  
  /**
   * calculate speed based on status
   * max : max IV & EV with beneficial Nature(1.1x)
   * neutral_max: max IV & EV with neutral Nature(1x)
   * neutral_min: max IV with no EV with neutral Nature(1x)
   * min : no IV & EV with hindering Nature(0.9x)
   */
  let p1SpeedStat = new Map([
    ['max', calculateStat(base_speed1, 31, 252, "beneficial", status1)],
    ['neutral_max', calculateStat(base_speed1, 31, 252, "neutral", status1)],
    ['neutral_min', calculateStat(base_speed1, 31, 0, "neutral", status1)],
    ['min', calculateStat(base_speed1, 0, 0, "hindering",status1)]
  ])
  let p2SpeedStat = new Map([
    ['max', calculateStat(base_speed2, 31, 252, "beneficial",status2)],
    ['neutral_max', calculateStat(base_speed2, 31, 252, "neutral",status2)],
    ['neutral_min', calculateStat(base_speed2, 31, 0, "neutral",status2)],
    ['min', calculateStat(base_speed2, 0, 0, "hindering",status2)]
  ])


  //verdict based on base speed stat
  if(p1SpeedStat.get('max')! > p2SpeedStat.get('max')!){
    resp.verdict = FASTER
  }else if (p1SpeedStat.get('max')! === p2SpeedStat.get('max')!){
    resp.verdict = TIE
  }else if (p1SpeedStat.get('max')! < p2SpeedStat.get('max')!){
    resp.verdict = SLOWER
  }

  // if(inTrickRoom){
  //   resp.verdict = resp.verdict * -1 as 1 | 0 | -1
  // }


  //analyze further based on verdict
  switch (resp.verdict) {
    case FASTER:
      //min EV investement to outspeed max stat p2
      console.log(`${p1SpeedStat.get('max')!} ${p2SpeedStat.get('max')}`)
      let minStat = {minEV: 0,minIV: 0, nature:''}
      let minEV = evExtractor(base_speed1, p2SpeedStat.get('max')! + 1, 'beneficial')
      if(minEV < 0){
        minEV =  evExtractor(base_speed1, p2SpeedStat.get('max')! + 1, 'neutral')
        if(minEV <= 0 ){
          minStat = {minEV: 0, minIV: 31, nature:'neutral'}
        }else if(minEV > 0){
          minStat = {minEV: minEV, minIV: 31, nature:'neutral'}
        }
      }else if(minEV >= 0){
        minStat = {minEV: minEV, minIV: 31, nature:'beneficial'}
      }

      //min booost needed to outspeed p1
      let min_boost : number;
      min_boost = Math.ceil((p1SpeedStat.get('max')! / p2SpeedStat.get('max')! / 0.5) - 2)
      console.log(min_boost)
      resp.message.push(`will get outsped with at least ${min_boost} (${1 + (0.5 * min_boost)}x) speed boost`)
      break;
      
    case TIE:
    
      break;
    case SLOWER:
  
      break;
        
    default:
      break;
  }

  return resp
}

export default speedAnalyzer