import statCalculator from "./statCalculator"
import { Modifiers, PkmnBaseStat } from "./types"





export interface responseProp{
  verdict : 1 | 0 | -1
  min_boost: number
  inTrickRoom: boolean
}

/**
 * @desc a speed analyzer meant for the advanced calculator type, it will only return if pkmn1 is faster than 
 *        pkmn2 and how many boost to outspeed the faster one
 * 
 * @param p1stats: the stats of pokemon number 1 consisting of {base speed, ev, iv, nature}
 * @param p2stats : the stats of pokemon number 1 consisting of {base speed, ev, iv, nature}
 * @param p1mods : an array of modifiers affecting pokemon 1 
 * @param p2mods : an array of modifiers affecting pokemon 1
 * @param trick_room : boolean, indicate if Trick Room is active
 * @returns returns an object with the property verdict: 1|0|-1, min_boost: number, and inTrickRoom: boolean
 */
function advancedModeAnalyzer(p1stats : PkmnBaseStat, p2stats : PkmnBaseStat ,p1Mods : Modifiers[], p2Mods : Modifiers[], trick_rooom : boolean): responseProp{
  let resp : responseProp = {
    verdict: 0,
    min_boost:0,
    inTrickRoom:trick_rooom
  }
  let p1TotalSpeed = statCalculator(p1stats.base,p1stats.ev,p1stats.iv,p1stats.nature,p1stats.lvl,p1Mods);
  let p2TotalSpeed = statCalculator(p2stats.base,p2stats.ev,p2stats.iv,p2stats.nature,p1stats.lvl,p2Mods);
  if(p1TotalSpeed > p2TotalSpeed){
    resp.verdict = 1;
    resp.min_boost = Math.ceil((p1TotalSpeed / p2TotalSpeed / 0.5) - 2);
  }else if(p1TotalSpeed < p2TotalSpeed){
    resp.verdict = -1;
    resp.min_boost = Math.ceil((p2TotalSpeed / p1TotalSpeed / 0.5) - 2);
  }else if(p1TotalSpeed === p2TotalSpeed){}

  return resp
}

export default advancedModeAnalyzer