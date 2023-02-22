import styles from './input.module.scss'

interface InputProp{
  type : 'text' | 'number'
  title?: string
  id?: string 
  defaultValue?: string | number
  onChange? : (id : string, value: string | number) => void
  className? : string
  style? : React.CSSProperties
  disabled? : boolean
  required? : boolean
  minValue? : number
  maxValue? : number
  size? : number
}

var timerId:NodeJS.Timeout;

const Input = ({type, title, id, size, defaultValue, onChange, className, style, disabled, required, minValue, maxValue} : InputProp) => {
  
  
  function updateValue(event : React.FormEvent<HTMLInputElement>){
    clearTimeout(timerId)
    let value = type === 'number' ? Number(event.currentTarget.value) : event.currentTarget.value;
    if(type === 'number' && event.currentTarget.value === ''){
      console.log(value)
      event.currentTarget.value = minValue+'' 
    }else if(typeof value === 'number'){//check if input value is in range of min and max value
      if(minValue && value < minValue){
        value = minValue
        event.currentTarget.value = minValue+''
      }else if(maxValue && value > maxValue){
        value = maxValue
        event.currentTarget.value = maxValue+''
      }
    }
    timerId = setTimeout(() => {
      if(typeof onChange !== 'undefined' && id){
        onChange(id, value)
      }
    }, 1000);
  }

  return(
    <div className={`${!!className ? className : ''} ${required ? styles.required : ''} ${styles.inputContainer}`} style={style}>
      <label className={styles.inputLabel} htmlFor={id}>{title}</label>
      <input className={styles.input} type={type} maxLength={16} min={minValue} max={maxValue} size={!!size ? size : 15} id={id} disabled={disabled} defaultValue={defaultValue} onChange={updateValue}/>
    </div>
  )
}

export default Input