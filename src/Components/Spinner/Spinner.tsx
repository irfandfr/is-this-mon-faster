import style from './spinner.module.scss'

interface SpinnerProps{
  className? : string 
}

const Spinner = ({className}:SpinnerProps) =>{
  return(
    <div className={`${style.spinner} ${!!className && className}`}></div>
  )
}

export default Spinner