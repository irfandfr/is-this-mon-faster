import React from 'react'
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import BigInput from '../../Components/Forms/BigInput/BigInput'

import style from './homepage.module.scss'

const Homepage = () =>{
  return(
    <main className={style.homepage}>
      <h3 className={style.text} style={{margin: '33px 0'}}>Is</h3>
      <BigInput color='#36B7AF'/>
      <h4 className={style.text}style={{textAlign: 'center', margin: '34px 0'}}>faster <br /> than</h4>
      <BigInput color='#9221C7'/>
      <Card style={{marginTop: '37px'}}>
        <Card.Header text='Find Out:' />
        <Card.ListItem text='Speed calculations (Max, Min, Neutral nature etc.)' type='safe' />
        <Card.ListItem text='Minimum EV investment' type='safe' />
        <Card.ListItem text='Trick Room option' type='safe' />
        <Card.ListItem text='Potential risk (Choice Scarf, Tailwind)' type='warning' />
        <Card.ListItem text='Minimum speed boost to outspeed or outsped' type='warning' />
      </Card>
      <Button text='Try Now' type='primary' style={{paddingLeft: '20px', paddingRight: '20px', marginTop: '37px', marginBottom: '20px'}}/>
    </main>
  )
}

export default Homepage