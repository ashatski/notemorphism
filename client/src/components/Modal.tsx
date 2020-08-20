import React, { FC } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  modalVisible: boolean,
  modalMessage: string,
}

const Modal: FC<ModalProps> = ({ modalVisible, modalMessage }) => {
  return createPortal(
    <>
      <div className={`modal ${modalVisible ? 'modal--active' : ''}`}>
        <span>{modalMessage}</span>
      </div>
    </>,
    document.body
  )
}

export default Modal
