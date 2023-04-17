import style from './App.module.scss';
import './styles/global.scss';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';


function App() {
  const HEADER_MENU = [
    {title: 'Home', link:'/'},
    {title: 'Calculator', link:'/calc'},
    {title: 'Advanced Calculator', link: '/advanced'}
  ]
  return (
    <div className={`${style.light} ${style.app}`} >
      <Header menu = {HEADER_MENU}/>
      <Outlet />
    </div>
  );
}

export default App;
