import React from 'react';
import style from './App.module.scss';
import './styles/global.scss';
import speedAnalyzer from './Utils/speedAnalyzer';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';


function App() {
  let monStat = {
    base_speed1: 90,
    base_speed2: 20,
    inTrickRoom: true
  }
  return (
    <div className={`${style.light} ${style.app}`} data-theme='dark'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
