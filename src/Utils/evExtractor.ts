import baseStatCalculator from "./baseStatCalculator"

/**
 * Extract Effort value of a pokemon based on its base stat, actual stat, and nature
 * @param baseStat base stat of a pokemon ranging from 1 to 255
 * @param actualStat the actual pokemon stat withouth any boost
 * @param nature the nature affecting the pokemon stat. "beneficial", "neutral", or "hindering"
 * @param iv the Individual Value of pokemon, defaults to 31 if empty or invalid value
 * @param level the pokemon level ranging from 1-100, defaults to 50 if empty or invalid value
 * @returns returns the Effort Value needed to reach actual stat, will return -1 if speed is not attainable
 */
const evExtractor = (baseStat : number, actualStat : number, nature : 'beneficial' | 'neutral' | 'hindering',iv? :number, level? : number) =>{
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

  //check if speed is attainable, returns -1 if speed is too high or too low to achieve
  if(actualStat > baseStatCalculator(baseStat,252, calcIV ,nature, calcLevel).stat || actualStat < baseStatCalculator(baseStat,0, calcIV ,nature, calcLevel).stat){
    return(-1)
  }else{
    ev = (((Math.ceil(actualStat/NATURE_BOOST.get(nature)!) - 5) * (100/calcLevel) - 2*baseStat) - calcIV)*4
  }
  return ev
}

export default evExtractor