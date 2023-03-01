import Button from "../../Components/Button/Button";
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon";
import MainView from "../../Components/MainView/MainView";

import style from './error.module.scss'
export default function ErrorPage() {
  return (
    <MainView className={style.errorContainer}>
      <h1>Oops!</h1>
      <p>Sorry, this page didn't exist!.</p>
      <Button icon={<TriangleLeftIcon className={style.icon}/>} href="/" type='secondary' text="Go Back" style={{marginTop: '39px'}}/>
    </MainView>
  );
}