/**
 * cn - 缩放动画
 *    -- 设置 zoom 属性来开启缩放动画
 * en - Zoom
 *    -- Set the zoom property to enable zoom animation
 */
import React, { useState } from 'react'
import { Modal, Button, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalFooter = ModalProps['footer']
type ModalVisible = ModalProps['visible']
type ModalOnClose = ModalProps['onClose']

const App: React.FC = () => {
  const [visible, setVisible] = useState<ModalVisible>(false)

  const handleClose: ModalOnClose = () => setVisible(false)

  const footer = (): ModalFooter => (
    <Button key="ok" type="primary" onClick={() => setVisible(false)}>
      Ok
    </Button>
  )

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>

      <Modal zoom width={400} title="zoom" footer={footer()} visible={visible} onClose={handleClose}>
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  )
}

export default App
