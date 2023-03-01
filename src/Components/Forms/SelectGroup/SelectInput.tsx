import styles from './selectinput.module.scss'

interface InputProp{
  options: {value: number | string, name: string}[]
  title?: string
  id?: string 
  onChange? : () => void
  className? : string
  style? : React.CSSProperties
  disabled? : boolean
}
const SelectInput = ({options,  title, id, onChange, className, style, disabled} : InputProp) =>{
  
  function renderOption(){
    return options.map(({value, name} : {value: number | string, name: string}) =>{
      return(<option value={value} key={`${id}-${value} `}>{name}</option>)
    })
  }
  
  return(
    <div className={`${!!className ? className : ''}  ${styles.selectInputContainer}`} style={style}>
      <label className={styles.inputLabel} htmlFor={id}>{title}</label>
      <select className={styles.selectInput} name={title} id={id}>aa
        {renderOption()}
      </select>
    </div>
  )
}

export default SelectInput