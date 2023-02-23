import Button from "../../Components/Button/Button"
import TriangleLeftIcon from "../../Components/Icons/TriangleLeftIcon"
import MainView from "../../Components/MainView/MainView"

import style from './loading.module.scss'

interface LoadingPageProp{
  errorText : string
}

const LoadingPage = ({errorText}: LoadingPageProp) =>{
  return(
    <MainView className={style.loadingPage}>
      {
        !(errorText === '') ? (
          <>
            <h3>{errorText}</h3>
            <Button icon={<TriangleLeftIcon />} href="/" type='secondary' text="Go back" style={{marginTop: '39px'}}/>
          </>
        ) : (
          <h3 className={style.loadingText}></h3>
        )
      }
      
    </MainView>
  )
}

export default LoadingPage