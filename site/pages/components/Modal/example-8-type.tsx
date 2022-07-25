/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React, { useState } from 'react'
import { Modal, Button, Select, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalType = ModalProps['type']
type ModalFooter = ModalProps['footer']
type ModalVisible = ModalProps['visible']

const typeList: ModalType[] = ['info', 'success', 'warning', 'error']
const style: React.CSSProperties = { width: 100, marginInlineEnd: 12 }

const App: React.FC = () => {
  const [type, setType] = useState<ModalType>('success')
  const [visible, setVisible] = useState<ModalVisible>(false)

  const handleOk = () => {
    setVisible(false)
    console.log('clicked ok!')
  }

  const handleCancel = () => {
    setVisible(false)
    console.log('clicked cancel')
  }

  const show = () => setVisible(true)

  const footer = (): ModalFooter => [
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,

    <Button key="ok" type="primary" onClick={handleOk}>
      Ok
    </Button>,
  ]

  return (
    <div>
      <Select data={typeList} value={type} style={style} keygen onChange={setType} />

      <Button onClick={show}>click me</Button>

      <Modal
        type={type}
        width={500}
        visible={visible}
        footer={footer()}
        onClose={handleCancel}
        title={`Modal Title with ${type} Icon`}
      >
        <span>Modal type: </span>
        <b>{type}</b>
      </Modal>
    </div>
  )
}
export default App
