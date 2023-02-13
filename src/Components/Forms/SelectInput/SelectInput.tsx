import styles from './selectinput.module.scss'

interface InputProp{
  options: {value: number | string, name: string}[]
  title?: string
  id?: string 
  onChange? : (id: string, value: string | number) => void
  className? : string
  style? : React.CSSProperties
  disabled? : boolean
}
const SelectInput = ({options,  title, id, onChange, className, style, disabled} : InputProp) =>{
  
  function updateValue(event : React.ChangeEvent<HTMLSelectElement>){
    if(typeof onChange !== 'undefined' && id){
      onChange(id, event.currentTarget.value)
    }
  }

  function renderOption(){
    return options.map(({value, name} : {value: number | string, name: string}) =>{
      return(<option value={value} key={`${id}-${value} `}>{name}</option>)
    })
  }
  
  return(
    <div className={`${!!className ? className : ''}  ${styles.selectInputContainer}`} style={style}>
      <label className={styles.inputLabel} htmlFor={id}>{title}</label>
      <select className={styles.selectInput} name={title} id={id} onChange={updateValue}>
        {renderOption()}
      </select>
    </div>
  )
}

export default SelectInput