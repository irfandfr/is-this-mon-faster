
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
export function natureToSigns(nature: 'beneficial'|'hindering'|'neutral'){
  switch (nature) {
    case 'beneficial':
      return('+')
    case 'hindering':
      return('-')
    case 'neutral':
      return('.')
    default:
      return'';
  }
}

/**
 * @desc function to convert signs to nature values
 * @param sign :'+'|'-'|'.' the expected sign types
 * @returns : ('beneficial'|'hindering'|'neutral') nature representing said sign
 */
 export function signsToNature(sign: '+'|'-'|'.'){
  switch (sign) {
    case '+':
      return('beneficial')
    case '-':
      return('hindering')
    case '.':
      return('neutral')
    default:
      return'';
  }
}

export function modifiersAbbreviator(mod : 'active_ability'|'tailwind'|'paralyze'|'iron_ball'|'choice_scarf'){
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
      break;
  }
}

export function modifiersExtendor(mod : 'ab'|'tw'|'pz'|'ib'|'cs'){
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
      break;
  }
}