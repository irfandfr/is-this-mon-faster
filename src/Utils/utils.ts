import { Modifiers, PkmnData } from "./types";

/**
 * @desc function to calculate speed after been given a speed boost
 * @param speed :(number) the calculated total speed of a pokemon 
 * @param boost :(number) the speed boost multipler in the range from -6 to 6
 * @returns 
 */
export function statBoostCalc(speed: number, boost: number):number{
  let stat = 0;
  if(boost >= 0){
    stat = speed * (2 + boost)/2 
  }else if(boost < 0){
    stat = speed * 2 / (2 + Math.abs(boost))
  }
  return Math.floor(stat)
}
/**
 * @desc function to convert natures to signs to shorten the value
 * @param nature :('beneficial'|'hindering'|'neutral') the expected nature types
 * @returns : '+'|'-'|'.' signs representing said natures
 */
export function natureToSigns(nature: 'beneficial'|'hindering'|'neutral'|string){
  switch (nature) {
    case 'beneficial':
      return('+')
    case 'hindering':
      return('-')
    case 'neutral':
      return('.')
    default:
      return undefined;
  }
}

/**
 * @desc function to convert signs to nature values
 * @param sign :'+'|'-'|'.' the expected sign types
 * @returns : ('beneficial'|'hindering'|'neutral') nature representing said sign
 */
 export function signsToNature(sign: '+'|'-'|'.'|string){
  switch (sign) {
    case '+':
      return('beneficial')
    case '-':
      return('hindering')
    case '.':
      return('neutral')
    default:
      return undefined;
  }
}

export function modifiersAbbreviator(mod : Modifiers | string){
  switch (mod) {
    case 'active_ability':
      return 'ab'
    case 'tailwind':
      return 'tw'
    case 'paralyze':
      return 'pz'
    case 'choice_scarf':
      return 'cs'
    case 'iron_ball':
      return 'ib'
    default:
      return undefined
  }
}

export function modifiersExtendor(mod : 'ab'|'tw'|'pz'|'ib'|'cs'|string): Modifiers|undefined{
  switch (mod) {
    case 'ab':
      return 'active_ability'
    case 'tw':
      return 'tailwind'
    case 'pz':
      return 'paralyze'
    case 'cs':
      return 'choice_scarf'
    case 'ib':
      return 'iron_ball'
    default:
      return undefined
  }
}

export function dbToPkmnData(name : string, payload:{baseSpeed:string,image:'link'}): PkmnData{
  let pkmn : PkmnData = {name: name, base: parseInt(payload.baseSpeed), imgLink: payload.image, ev: 255, iv: 31, lvl: 50,nature:'neutral'}
  return pkmn
}

export function modsValue(mods : Modifiers[]):number{
  const TAILWIND_MULTIPLIER = 2;
  const PARALYZE_MULTIPLIER = 0.5;
  const CHOICE_SCARF_MULTILPIER = 1.5;
  const ABILITY_MULTIPLIER = 2;
  const IRON_BALL_MULTIPLIER = 0.5
  let stat = 1
  mods.forEach( entry => {
    switch (entry) {
      case ('tailwind'):
        stat = stat * TAILWIND_MULTIPLIER
        break;
      case ('choice_scarf'):
        stat = stat * CHOICE_SCARF_MULTILPIER
        break;
      case ('active_ability'):
        stat = stat * ABILITY_MULTIPLIER
        break;
      case ('paralyze'):
        stat = stat * PARALYZE_MULTIPLIER
        break;
      case ('iron_ball'):
        stat = stat * IRON_BALL_MULTIPLIER
        break;
      default:
        break;
    }
  });
  return stat
}

export function pkmnSpeedStateConverter(state : string){
  switch (state) {
    case 'max+':
      return 'Max EV+'
    case 'max':
      return 'Max EV'
    case 'min':
      return 'Min EV'
    case 'min--':
      return 'MinEV&IV-'
    case 'win':
      return 'Min EV'
    default:
      break;
  }
}

export function pkmnStatSpreadConverter(state : string){
  switch (state) {
    case 'max+':
      return '252EV/31IV/Beneficial'
    case 'max':
      return '252EV/31IV/Neutral'
    case 'min':
      return '0EV/31IV/Neutral'
    case 'min--':
      return '0EV/0IV/Hindering'
    case 'win':
      return '0EV/31IV/Neutral'
    default:
      break;
  }
}