import baseStatCalculator from "./baseStatCalculator"
import statCalculator from "./statCalculator";
import { Modifiers } from "./types";
import { modsValue } from "./utils";

/**
 * Extract Effort value of a pokemon based on its base stat, actual stat, and nature
 * @param baseStat base stat of a pokemon ranging from 1 to 255
 * @param actualStat the pokemon target speed
 * @param mods modifiers that affect the pokemon stat
 * @param nature the nature affecting the pokemon stat. "beneficial", "neutral", or "hindering"
 * @param iv the Individual Value of pokemon, defaults to 31 if empty or invalid value
 * @param level the pokemon level ranging from 1-100, defaults to 50 if empty or invalid value
 * @returns returns the Effort Value needed to reach actual stat, will return -1 if speed is not attainable
 */
const evExtractor = (baseStat : number, actualStat : number, mods: Modifiers[], nature : 'beneficial' | 'neutral' | 'hindering',iv? :number, level? : number) =>{
  const NATURE_BOOST = new Map<string, number>([
    ['beneficial', 1.1],
    ['neutral', 1],
    ['hindering', 0.9]
  ])
  let ev;
  let calcIV = 31;
  let calcLevel = 50;

  //check iv and level validity if given
  if(!!iv && iv <= 31 && iv >= 0){
    calcIV = iv
  }
  if(!!level && level <= 100 && level >= 1){
    calcLevel = level
  }

  let p1Stat = new Map([
    ['max', statCalculator(baseStat,252, 31 ,'beneficial', calcLevel, mods)],
    ['min', statCalculator(baseStat,0, 0 ,"hindering", calcLevel, mods)]
  ])

  //check if speed is attainable, returns -1 if speed is too high or too low to achieve
  if(actualStat > p1Stat.get('max')! || actualStat < p1Stat.get('min')!){
    return(-1)
  }else{
    ev = (((Math.ceil(actualStat/(NATURE_BOOST.get(nature)! * modsValue(mods))) - 5) * (100/calcLevel) - 2*baseStat) - calcIV)*4
    if(ev < 0 || ev > 252){
      return -1
    }
  }
  return ev
}

export default evExtractor