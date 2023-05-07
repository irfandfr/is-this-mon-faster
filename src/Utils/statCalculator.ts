import baseStatCalculator from "./baseStatCalculator";
import { Modifiers } from "./types";
import { modsValue } from "./utils";

/**
   * function to calculate status using the baseStatCalculator function as a base
   *  and multipled with the current modifiers affecting the pokemon
   */
 function statCalculator(base_speed: number, ev : number, iv: number, nature : 'beneficial'| 'neutral' | 'hindering',level: number, status? : Modifiers[],boost?:number){
  let stat : number;

  stat = baseStatCalculator(base_speed, ev, iv, nature, level).stat

  return Math.floor(stat * modsValue(!!status ? status : []) * (!!boost ? (boost > 0 ? (boost+2)/2 : 2/(Math.abs(boost)+2)) : 1))
}

export default statCalculator