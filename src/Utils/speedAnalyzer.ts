interface responseProp{
  verdict : 1 | 0 | -1
  message: string[]
}


/**
 * 
 * @param base_speed1 base speed of the pokemon to be tested
 * @param base_speed2 base speed of the opposing pokemon
 * @param env field effect occuring 'trick_room', 'tailwind', both 'trick & tail', or none
 */
const speedAnalyzer = (base_speed1 : number , base_speed2: number, env? : 'trick_room' | 'tailwind' | 'trick & tail') =>{
  const FASTER = 1;
  const TIE = 0
  const SLOWER = -1; 
  let resp : responseProp = {
    verdict: 0,
    message: []
  }

  //verdict based on base speed stat
  if(base_speed1 > base_speed2){
    resp.verdict = FASTER
  }else if (base_speed1 === base_speed2){
    resp.verdict = TIE
  }else if (base_speed1 < base_speed2){
    resp.verdict = SLOWER
  }
  //verdict based on based on env
  switch (env) {
    case 'tailwind':
      if(resp.verdict === TIE){
        resp.verdict = FASTER
      }else if(resp.verdict === SLOWER){
        if(base_speed1 * 2 > base_speed2){
          resp.verdict = FASTER
        }else if(base_speed1 * 2 === base_speed2){
          resp.verdict = TIE
        }
      }
      break;
    case 'trick_room':
      resp.verdict = resp.verdict * -1 as 1 | 0 | -1
      break;
    case 'trick & tail':
      resp.verdict = resp.verdict * -1 as 1 | 0 | -1
      if(resp.verdict === TIE){
        resp.verdict = SLOWER
      }else if(resp.verdict === FASTER){
        if(base_speed1 * 2 > base_speed2){
          resp.verdict = SLOWER
        }else if(base_speed1 * 2 === base_speed2){
          resp.verdict = TIE
        }
      }
      break;
    
    default:
      break;
  }

  return resp
}

export default speedAnalyzer