/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Modal 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React, { useState } from 'react'
import { Modal, Button, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalVisible = ModalProps['visible']
type ModalContainer = ModalProps['container']

const App: React.FC = () => {
  const [wrapper, setWrapper] = useState<ModalContainer>()
  const [visible, setVisible] = useState<ModalVisible>(false)

  const bindElement: React.LegacyRef<HTMLDivElement> = ref => {
    setWrapper(ref!)
  }

  const show = () => {
    setVisible(true)
  }

  const handleDismiss = () => {
    setVisible(false)
  }

  return (
    <div ref={bindElement}>
      <Button onClick={show}>click me</Button>
      <Modal
        container={wrapper}
        visible={visible}
        width={400}
        title="Modal Title"
        onClose={handleDismiss}
        footer={[
          <Button key="cancel" onClick={handleDismiss}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleDismiss}>
            Ok
          </Button>,
        ]}
      >
        Modal mount after Button
      </Modal>
    </div>
  )
}

export default App
