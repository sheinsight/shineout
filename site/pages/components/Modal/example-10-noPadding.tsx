/**
 * cn - 无边距
 *    -- 取消内容区域的padding。在 antd 主题下可见具体效果，sheinout主题本无边距。
 * en - NoPadding
 *    -- Set the content style padding to 0
 */
import React, { useState } from 'react'
import { Modal, Button, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalFooter = ModalProps['footer']
type ModalVisible = ModalProps['visible']
type ModalOnClose = ModalProps['onClose']

const App: React.FC = () => {
  const [content, setContent] = useState(1)
  const [visible, setVisible] = useState<ModalVisible>(false)

  const handleOk = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked ok!')
  }

  const handleCancel: ModalOnClose = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked cancel')
  }

  const footer = (): ModalFooter => [
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,

    <Button key="ok" type="primary" onClick={handleOk}>
      Ok
    </Button>,
  ]

  const show = () => setVisible(true)

  return (
    <div>
      <Button onClick={show}>no padding</Button>

      <Modal noPadding width={400} visible={visible} title="Modal Title" onClose={handleCancel} footer={footer()}>
        {`you are visited ${content}`}
      </Modal>
    </div>
  )
}

export default App
