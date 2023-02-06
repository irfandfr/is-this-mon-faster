import React from 'react'
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import BigInput from '../../Components/Forms/BigInput/BigInput'
import MainView from '../../Components/MainView/MainView'

import style from './homepage.module.scss'

const Homepage = () =>{
  return(
    <MainView className={style.homepage}>
      <h3 className={style.text} >Is</h3>
      <div className={style.compareGroup}>
        <BigInput color='#36B7AF'/>
        <h4 className={style.text}style={{textAlign: 'center'}}>faster <br /> than</h4>
        <BigInput color='#C13CFF'/>
      </div>
      <Card style={{marginTop: '37px'}}>
        <Card.Header text='Find Out:' />
        <Card.ListItem text='Speed calculations (Max, Min, Neutral nature etc.)' type='safe' />
        <Card.ListItem text='Minimum EV investment' type='safe' />
        <Card.ListItem text='Trick Room option' type='safe' />
        <Card.ListItem text='Potential risk (Choice Scarf, Tailwind)' type='warning' />
        <Card.ListItem text='Minimum speed boost to outspeed or outsped' type='warning' />
      </Card>
      <Button text='Try Now' type='primary' style={{paddingLeft: '20px', paddingRight: '20px', marginTop: '37px', marginBottom: '20px'}}/>
    </MainView>
  )
}

export default Homepage