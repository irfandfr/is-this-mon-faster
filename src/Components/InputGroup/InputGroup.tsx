import React from 'react'
import style from './inputcheck.module.scss'

export interface SelectionProp{
  icon : JSX.Element
  title: string
  id: string
  check: boolean
  value?: string
}

interface SelectionGroupProp{
  [key : string] : SelectionProp
}

interface InputGroupProp{
  groupList : SelectionGroupProp
  onClick: ([arg] : any) => void
  disabled?: boolean
}

interface CheckItemProp extends SelectionProp{
  onClick?: () => void
}

const CheckItem = ({check, icon, title, id, onClick, value, } : CheckItemProp) => {
  return(
    <div className={`${style.checkItem} ${check ? style.checked : ''}`} >
      <input  className={style.checkbox} type="checkbox" name={title} value={value} id={id} checked={check} onChange={onClick}/>
      <span className={style.focusOutline}></span>
      <span className={style.customCheckmark}></span>
      <div className={style.iconContainer}>
        {icon}
      </div>
      <label className={style.checkLabel} htmlFor={id}>{title}</label>
    </div>
  )
}

const InputGroup = ( {groupList, onClick, disabled} : InputGroupProp) =>{
  function renderGroup(listItems:SelectionGroupProp){
    return Object.keys(listItems).map((key : string) => {
      let {icon, title, id, value, check} = listItems[key]
      const STYLEDICON = React.cloneElement(icon, {className: style.icon});
      return(<CheckItem check={check} icon={STYLEDICON} title={title} id={id} value={value} key={`${title}-${id}`} onClick={() => onClick({type:key})}/>)
    })
  }
  return(
  <form className={`${style.inputCheckGroup} ${disabled ? style.disabled : ''}`}>
    {renderGroup(groupList)}
  </form>
  )
}


export default InputGroup