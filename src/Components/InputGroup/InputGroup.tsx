import React from 'react'
import style from './inputcheck.module.scss'

interface SelectionProp{
  icon : JSX.Element
  title: string
  id: string
  check: boolean
  value?: string
}

interface InputGroupProp{
  groupList : SelectionProp[]

}

interface CheckItemProp extends SelectionProp{
  key: string
  onClick?: () => void
}

const CheckItem = ({check, icon, title, id, onClick, value, key} : CheckItemProp) => {
  return(
    <div className={`${style.checkItem} ${check ? style.checked : ''}`} key={key} onClick={onClick}>
      <input className={style.checkbox} type="checkbox" name={title} value={value} id={id} checked={check} />
      <span className={style.customCheckmark}></span>
      <div className={style.iconContainer}>
        {icon}
      </div>
      <label className={style.checkLabel} htmlFor={id}>{title}</label>
    </div>
  )
}

const InputGroup = ({groupList} : InputGroupProp) =>{
  function renderGroup(listItems:SelectionProp[]){
    return listItems.map(({icon, title, id, value, check} : SelectionProp) => {
      const STYLEDICON = React.cloneElement(icon, {className: style.icon});
      return(<CheckItem check={check} icon={STYLEDICON} title={title} id={id} value={value} key={`${title}-${id}`}/>)
    })
  }
  return(
  <form className={style.inputCheckGroup}>
    {renderGroup(groupList)}
  </form>
  )
}


export default InputGroup