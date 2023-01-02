import React from 'react'


/**
 * A function to calculate the stat value of a pokemon based on its base stats, ev, iv, level, and nature. only works for stats other than HP
 * @param base_stat the base stat of the pokemon ranging from 1 - 255
 * @param ev the effort value of the pokemon ranging from 0 - 252
 * @param iv the individual value of the pokemon ranging from 0 - 31
 * @param nature the nature affecting the pokemon stat. "beneficial", "neutral", or "hindering" 
 * @param level the level of the pokemon ranging from 1 - 100
 * @returns {stat, errMessage} returns object with the final value of the pokemon and an array of string containing errors
 */
const BaseStatCalculator = (base_stat : number, ev: number, iv : number, nature: 'beneficial' | 'hindering' | 'neutral', level? : number) =>{
  const NATURE_BOOST = new Map<string, number>([
    ['beneficial', 1.1],
    ['neutral', 1],
    ['hindering', 0.9]
  ])

  //constants for maximum and minimum value for some properties
  const MAX= new Map<string, number>([
    ['base_stat', 255],
    ['ev', 252],
    ['iv', 31],
    ['level', 100]
  ])
  const MIN= new Map<string, number>([
    ['base_stat', 1],
    ['ev', 0],
    ['iv', 0],
    ['level', 1]
  ])

  let errMessage : string[] = [];
  let stat; 
  let props = {base_stat, ev, iv, nature, level}

  //error checker for values excluding nature
  let key : keyof typeof props
  for (key in props){
    if(key !== 'nature'){
      if(props[key]! < MIN.get(key)!){
        errMessage.push(`${key} value is capped at ${MIN.get(key)}`)
        props[key] = MIN.get(key)!
      }else if(props[key]! > MAX.get(key)!){
        errMessage.push(`${key} value is capped at ${MAX.get(key)}`)
        props[key] = MAX.get(key)!
      }
    }
  }

  stat = Math.floor((Math.floor(0.01 * (2 * props.base_stat + props.iv + Math.floor(0.25 * props.ev)) * (!!props.level ? props.level : 50)) + 5 ) * NATURE_BOOST.get(props.nature)!)

  return {stat, errMessage}
}

export default BaseStatCalculator