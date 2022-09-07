/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 *    -- Modal 会在 document.body 中创建一个新的层显示弹出内容。
 *    -- 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性。 * en - Base
 *    -- The basic usage for component.
 */
import React, { useState } from 'react'
import { Modal, Button, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalVisible = ModalProps['visible']
type ModalOnClose = ModalProps['onClose']

const App: React.FC = () => {
  const [content, setContent] = useState(1)
  const [visible, setVisible] = useState<ModalVisible>(false)

  const show = () => {
    setVisible(true)
  }

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

  return (
    <div>
      <Button onClick={show}>click me</Button>
      <Modal
        width={400}
        visible={visible}
        title="Modal Title"
        onClose={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Modal>
    </div>
  )
}

export default App
