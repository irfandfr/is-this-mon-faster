import React from 'react';
import './App.css';
import './styles/global.scss';
import speedAnalyzer from './Utils/speedAnalyzer';
import { Outlet } from 'react-router-dom';


function App() {
  let monStat = {
    base_speed1: 90,
    base_speed2: 20,
    inTrickRoom: true
  }
  console.log(speedAnalyzer({...monStat}))
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Outlet />
    </div>
  );
}

export default App;
