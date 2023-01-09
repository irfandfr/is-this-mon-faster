import React from 'react';
import logo from './logo.svg';
import './App.css';
import baseStatCalculator from './Utils/baseStatCalculator';
import speedAnalyzer from './Utils/speedAnalyzer';
import evExtractor from './Utils/evExtractor';
import { statusTypes } from './Utils/speedAnalyzer';


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
        {(baseStatCalculator(monStat.base_speed1, 300, 31, 'beneficial')).stat}
        <p>  vs  </p>
        {(baseStatCalculator(monStat.base_speed2, 300, 31, 'beneficial')).stat}
        <hr />
        <div>
        </div>
        <hr />
      </header>
    </div>
  );
}

export default App;
