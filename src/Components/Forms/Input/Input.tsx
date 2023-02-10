import styles from './input.module.scss'

interface InputProp{
  type : 'text' | 'number'
  title?: string
  id?: string 
  defaultValue?: string | number
  onChange? : () => void
  className? : string
  style? : React.CSSProperties
  disabled? : boolean
  required? : boolean
  minValue? : number
  maxValue? : number
  size? : number
}

const Input = ({type, title, id, size, defaultValue, onChange, className, style, disabled, required, minValue, maxValue} : InputProp) => {
  function updateValue(){
    if(typeof onChange !== 'undefined'){
      onChange()
    }
  }

  return(
    <div className={`${!!className ? className : ''} ${required ? styles.required : ''} ${styles.inputContainer}`} style={style}>
      <label className={styles.inputLabel} htmlFor={id}>{title}</label>
      <input className={styles.input} type={type} maxLength={16} min={minValue} max={maxValue} size={!!size ? size : 15} id={id} disabled={disabled} defaultValue={defaultValue} onChange={updateValue}/>
    </div>
  )
}

export default Input