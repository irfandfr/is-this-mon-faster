import baseStatCalculator from "./baseStatCalculator";
import evExtractor from "./evExtractor";


interface minStatProp{
  minEV: number,
  minIV: number,
  nature: 'beneficial' | 'hindering' | 'neutral' | undefined
  opponentState: 'min' | 'min-' |'min--' | 'max' | 'max+' | 'neutral' | 'win'| undefined
}
interface responseProp{
  verdict : 1 | 0 | -1
  min_stat: minStatProp
  min_boost: number
  inTrickRoom: boolean
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
    min_stat:{minEV: 0, minIV: 0, nature: undefined, opponentState: undefined},
    min_boost: 0,
    inTrickRoom : !!inTrickRoom
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

  if(inTrickRoom){
    resp.verdict = resp.verdict * -1 as 1 | 0 | -1
  }


  //analyze further based on verdict
  let minStat : minStatProp= {minEV: 0,minIV: 0, nature:undefined, opponentState: undefined}
  let min_boost : number;
  let minEV: number;

  /**
   * analyze speed based on environtment and different possible cases
   * some terminology used(assumes 31IV unless stated otherwise):
   * max(252 EV), min(0 EV), +(beneficial nature), -(hindering nature), [no sign](neutral nature), --(hindering nature 0IV)
   * ex: max+(252 EV 31 IV Beneficial Nature), min--(0 EV, 0IV, Hindering Nature)
   */
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
        resp.min_boost = min_boost
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
            minStat = {minEV: minEV, minIV: 31, nature:'beneficial', opponentState:'win'}
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
        resp.min_boost = min_boost;
        break;
          
      default:
        break;
    }

  }else if(!!inTrickRoom){
    switch (resp.verdict) {
      case FASTER:
        // check nature to outslow min-- speed p2
        if(p1SpeedStat.get('neutral_min')! < p2SpeedStat.get('min')!){
          //p1 can still outslow min-- p2 with neutral max iv 
          minStat = {minEV : 0, minIV: 31, nature: 'neutral', opponentState:'min--'}
        }else if(baseStatCalculator(base_speed1,0,0,'neutral').stat < p2SpeedStat.get('min')!){
          //p1 can still outslow min-- p2 with neutral no iv
          minStat = {minEV : 0, minIV: 0, nature: 'neutral', opponentState:'min--'}
        }else{
          //p1 can only outslow min-- p2 with min--
          minStat = {minEV : 0, minIV: 0, nature: 'hindering', opponentState:'min--'}
        }
        //min booost needed to outslow p1
        //used the formula x =(2 x (faster speed) ) / (lower speed) ; formula for negative boost is 2 / (2 + boost)
        min_boost = Math.ceil((2* p1SpeedStat.get('min')!) / p2SpeedStat.get('min')!)
        resp.min_boost = min_boost
      break;
      case TIE:
        minStat = {minEV : 0, minIV: 0, nature: 'neutral', opponentState:'min--'}
        min_boost = 1;
        break;
      case SLOWER:
        if(p1SpeedStat.get('min')! >= p2SpeedStat.get('neutral_min')!){
          minStat = {minEV : 0, minIV: 0, nature: 'neutral', opponentState:'min'}
        }else{
          minStat = {minEV : 0, minIV: 0, nature: 'neutral', opponentState:'win'}
        }
        //min booost needed to outslow p2
        min_boost = Math.ceil((2* p2SpeedStat.get('min')!) / p1SpeedStat.get('min')!)
        resp.min_boost = min_boost
        break;
        
      default:
        break;
    }
  }

  resp.min_stat = {...minStat}
  
  return resp
}

export default speedAnalyzer