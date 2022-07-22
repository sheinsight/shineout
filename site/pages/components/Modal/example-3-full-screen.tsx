/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使对话框全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the modal in full screen
 */
import React, { useState, useCallback } from 'react'
import { Modal, Button, TYPE } from 'shineout'
import Content from '../Form/example-01-base'

type ModalProps = TYPE.Modal.Props
type ModalFooter = ModalProps['footer']
type ModalVisible = ModalProps['visible']
type ModalOnClose = ModalProps['onClose']

const App: React.FC = () => {
  const [visible, setVisible] = useState<ModalVisible>(false)

  const cancel: ModalOnClose = useCallback(
    () => {
      setVisible(false)
    },
    [visible]
  )

  const footer = (): ModalFooter => (
    <Button type="primary" onClick={cancel}>
      OK
    </Button>
  )

  return (
    <div>
      <Modal title="Profile" fullScreen visible={visible} onClose={cancel} footer={footer()}>
        <Content />
      </Modal>
      <Button onClick={() => setVisible(true)}>Full Screen</Button>
    </div>
  )
}

export default App
