import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export type ConfirmProps = {
  show?: boolean
  title?: string
  message: string
  textConfirm?: string
  textCancel?: string
  onConfirm?: () => void
  onHide: () => void
  centered?: boolean
  size?: 'sm' | 'lg' | undefined
}

const Confirm = ({
  show = false,
  title,
  message,
  textConfirm,
  textCancel,
  onConfirm,
  onHide,
  centered = true,
  size,
}: ConfirmProps) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered={centered} size={size}>
        {!!title && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}

        {!!message && (
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
        )}

        {(!!textConfirm || !!textCancel) && (
          <Modal.Footer>
            {!!textCancel && (
              <Button variant="secondary" onClick={onHide}>
                {textCancel}
              </Button>
            )}
            {!!textConfirm && (
              <Button variant="primary" onClick={onConfirm}>
                {textConfirm}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default Confirm
