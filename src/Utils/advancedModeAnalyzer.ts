import statCalculator from "./statCalculator"
import { Modifiers, PkmnBaseStat } from "./types"



export interface advResponseProp{
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
function advancedModeAnalyzer(p1stats : PkmnBaseStat, p2stats : PkmnBaseStat ,p1Mods : Modifiers[], p2Mods : Modifiers[], trick_rooom : boolean): advResponseProp{
  let resp : advResponseProp = {
    verdict: 0,
    min_boost:0,
    inTrickRoom:trick_rooom
  }
  let p1TotalSpeed = statCalculator(p1stats.base,p1stats.ev,p1stats.iv,p1stats.nature,p1stats.lvl,p1Mods);
  let p2TotalSpeed = statCalculator(p2stats.base,p2stats.ev,p2stats.iv,p2stats.nature,p1stats.lvl,p2Mods);

  if(trick_rooom){
    if(p1TotalSpeed < p2TotalSpeed){
      resp.verdict = 1;
      let min_boost = Math.ceil((2* p2TotalSpeed) / p1TotalSpeed - 2)
      if(min_boost % 1 === 0){
        resp.min_boost = Math.ceil(min_boost) + 1
      }else{
        resp.min_boost = Math.ceil(min_boost)
      }
    }else if(p1TotalSpeed > p2TotalSpeed){
      resp.verdict = -1;
      let min_boost = (2* p1TotalSpeed) / p2TotalSpeed - 2;
      if(min_boost % 1 === 0){
        resp.min_boost = Math.ceil(min_boost) + 1
      }else{
        resp.min_boost = Math.ceil(min_boost)
      }
    }else if(p1TotalSpeed === p2TotalSpeed){
      resp.verdict = 0;
      resp.min_boost = 1
    }
  }else{
    if(p1TotalSpeed > p2TotalSpeed){
      resp.verdict = 1;
      resp.min_boost = Math.ceil((p1TotalSpeed / p2TotalSpeed / 0.5) - 2);
      if(p1TotalSpeed === p2TotalSpeed*resp.min_boost){
        resp.min_boost = resp.min_boost + 1;
      }
    }else if(p1TotalSpeed < p2TotalSpeed){
      resp.verdict = -1;
      resp.min_boost = Math.ceil((p2TotalSpeed / p1TotalSpeed / 0.5) - 2);
      if(p2TotalSpeed === p1TotalSpeed*((resp.min_boost + 2) /2)){
        resp.min_boost = resp.min_boost + 1;
      }
    }else if(p1TotalSpeed === p2TotalSpeed){
      resp.verdict = 0;
      resp.min_boost = 1
    }
  }

  return resp
}

export default advancedModeAnalyzer