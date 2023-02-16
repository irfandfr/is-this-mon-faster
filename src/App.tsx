import React from 'react';
import style from './App.module.scss';
import './styles/global.scss';
import speedAnalyzer from './Utils/speedAnalyzer';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';


function App() {
  const HEADER_MENU = [
    {title: 'Home', link:'/'},
    {title: 'Calculator', link:'/calc'},
    {title: 'Advanced Calculator', link: '/calc'}
  ]
  return (
    <div className={`${style.light} ${style.app}`} data-theme='light'>
      <Header menu = {HEADER_MENU}/>
      <Outlet />
    </div>
  );
}

export default App;
