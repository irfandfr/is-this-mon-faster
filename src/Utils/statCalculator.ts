import baseStatCalculator from "./baseStatCalculator";
import { Modifiers } from "./types";

/**
   * function to calculate status using the baseStatCalculator function as a base
   *  and multipled with the current modifiers affecting the pokemon
   */
 function statCalculator(base_speed: number, ev : number, iv: number, nature : 'beneficial'| 'neutral' | 'hindering',level: number, status? : Modifiers[]){
  const TAILWIND_MULTIPLIER = 2;
  const PARALYZE_MULTIPLIER = 0.5;
  const CHOICE_SCARF_MULTILPIER = 1.5;
  const ABILITY_MULTIPLIER = 2;
  const IRON_BALL_MULTIPLIER = 0.5
  let stat : number;

  stat = baseStatCalculator(base_speed, iv, ev, nature, level).stat
  if(!!status && status.length > 0 ){
    status.forEach( entry => {
      switch (entry) {
        case ('tailwind'):
          stat = stat * TAILWIND_MULTIPLIER
          break;
        case ('choice_scarf'):
          stat = Math.floor(stat * CHOICE_SCARF_MULTILPIER)
          break;
        case ('active_ability'):
          stat = stat * ABILITY_MULTIPLIER
          break;
        case ('paralyze'):
          stat = Math.floor(stat * PARALYZE_MULTIPLIER)
          break;
        case ('iron_ball'):
          stat = Math.floor(stat * IRON_BALL_MULTIPLIER)
          break;
        default:
          break;
      }
    });
  }

  return stat
}

export default statCalculator