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
  'active_ability',
  'iron_ball'
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
    const IRON_BALL_MULTIPLIER = 0.5
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
          case statusTypes.iron_ball:
            stat = Math.floor(stat * IRON_BALL_MULTIPLIER)
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
  let minStat = {minEV: 0,minIV: 0, nature:'', opponentState: ''}
  let min_boost : number;
  let minEV: number;

  if(!inTrickRoom){
    switch (resp.verdict) {
      case FASTER:
        //min EV investement to outspeed max stat p2
        minEV = evExtractor(base_speed1, p2SpeedStat.get('max')! + 1, 'beneficial')
        if(minEV < 0){
          minEV =  evExtractor(base_speed1, p2SpeedStat.get('max')! + 1, 'neutral')
          if(minEV <= 0 ){
            //can outspeed max speed p2 with not ev investment and neutral nature
            minStat = {minEV: 0, minIV: 31, nature:'neutral', opponentState: 'max+'}
          }else if(minEV > 0){
            //can outspeed max speed p2 with ev investment and neutral nature
            minStat = {minEV: minEV, minIV: 31, nature:'neutral', opponentState: 'max+'}
          }
        }else if(minEV >= 0){
          //can outspeed max speed p2 with ev and + nature
          minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState: 'max+'}
        }
  
        //min booost needed to outspeed p1
        min_boost = Math.ceil((p1SpeedStat.get('max')! / p2SpeedStat.get('max')! / 0.5) - 2)
        resp.message.push(`will get outsped with at least ${min_boost} (${1 + (0.5 * min_boost)}x) speed boost`)
        break;
        
        //minimum EV for +Nature p1 to outspeed p2 with max EV and a neutral nature
      case TIE:
        minEV = evExtractor(base_speed1, p2SpeedStat.get('neutral_max')! + 1, 'beneficial')
        minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState: 'max'}
        min_boost = 1;
        break;
        
      case SLOWER:
        minEV = evExtractor(base_speed1, p2SpeedStat.get('neutral_max')! + 1, 'beneficial')
        if(minEV < 0){
          minEV =  evExtractor(base_speed1, p2SpeedStat.get('neutral_min')! + 1, 'beneficial')
          if(minEV < 0){
            //cannot outspeed min speed neutral nature p2
            minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState:'min'}
          }else if(minEV >= 0){
             //can outspeed min speed neutral nature p2
            minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState:'min'}
          }
        }else if(minEV >= 0 ){
          //can outspeed max speed neutral nature p2
          minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState: 'max'}
        }
  
        //min booost needed to outspeed p2
        min_boost = Math.ceil((p1SpeedStat.get('max')! / p2SpeedStat.get('max')! / 0.5) - 2)
        resp.message.push(`will outsped with at least ${min_boost} (${1 + (0.5 * min_boost)}x) speed boost`)
        break;
          
      default:
        break;
    }
  
    return resp

  }else if(!!inTrickRoom){

  }
  
}

export default speedAnalyzer