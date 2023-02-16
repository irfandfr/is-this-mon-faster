import React from 'react'
import {  redirect, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import Card from '../../Components/Card/Card'
import BigInput from '../../Components/Forms/BigInput/BigInput'
import MainView from '../../Components/MainView/MainView'

import style from './homepage.module.scss'

const Homepage = () =>{
  let navigate = useNavigate()
  function redirectToCalc(){
    navigate("/calc")
  }
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
        <Card.ListItem type='safe'>Speed calculations (Max, Min, Neutral nature etc.)</Card.ListItem>
        <Card.ListItem type='safe'>Minimum EV investment</Card.ListItem>
        <Card.ListItem type='safe'>Trick Room option</Card.ListItem>
        <Card.ListItem type='warning'>Potential risk (Choice Scarf, Tailwind)</Card.ListItem>
        <Card.ListItem type='warning'>Minimum speed boost to outspeed or outsped</Card.ListItem>
      </Card>
      <Button onClick={redirectToCalc} text='Try Now' type='primary' style={{paddingLeft: '20px', paddingRight: '20px', marginTop: '37px', marginBottom: '20px'}}/>
    </MainView>
  )
}

export default Homepage