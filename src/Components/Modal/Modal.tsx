import { useEffect, useRef } from "react"
import CloseIcon from "../Icons/CloseIcon"

import style from './modal.module.scss'

interface ModalProp{
  open: boolean
  children? : React.ReactNode
  onClose? : () => void
  closeIcon?: boolean
}

interface ModalHeaderProp{
  text: string
}


const Modal = ({open, children, onClose, closeIcon}:ModalProp) =>{
  const modalCard = useRef<HTMLDivElement>(null)
  function check(e:MouseEvent){
    if(e.target === modalCard.current && onClose){
      onClose()
    }
  }
  useEffect(() => {
    if(modalCard && onClose){
      document.addEventListener('click',check)
    }
  }, [modalCard])
  
  return(
    <div className={`${style.modalContainer} ${open ? style.open : ''}`}  ref={modalCard}>
      <div className={style.modalCard}>
        {
          closeIcon && (
            <button className={style.closeBtn} onClick={onClose}>
              <CloseIcon className={style.icon}/>
            </button>
          )
        }
        {children}
      </div>
    </div>
  )
}

const Header : React.FC<ModalHeaderProp> = ({text} : ModalHeaderProp) => {
  return(
      <h3 className={style.headerTitle}>{text}</h3>
  )
}
Modal.Header = Header

export default Modal