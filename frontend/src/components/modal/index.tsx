import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
}): JSX.Element => {
  const onCloseWrapper = (): void => {
    onClose()
  }

  if (!isOpen) return <></>

  return (
    <div>
      <button onClick={onCloseWrapper}>X</button>
      {children}
    </div>
  )
}
