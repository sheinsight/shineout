/**
 * cn - 位置（抽屉）
 *    -- 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。
 * en - Position
 *    -- Set position property to specify the pop-up position.
 */
import React, { useState } from 'react'
import { Modal, Button, Form, Input, Select, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalFooter = ModalProps['footer']
type ModalVisible = ModalProps['visible']
type ModalPosition = ModalProps['position']

const positionList: ModalPosition[] = ['top', 'right', 'bottom', 'left']

const App: React.FC = () => {
  const [visible, setVisible] = useState<ModalVisible>(false)
  const [position, setPosition] = useState<ModalPosition>('right')

  const toggle = (v: boolean) => {
    setVisible(v)
  }

  const footer = (): ModalFooter => (
    <div>
      <Button onClick={() => toggle(false)}>Cancel</Button>
      <Modal.Submit>Submit</Modal.Submit>
    </div>
  )
  return (
    <div>
      <Select
        keygen
        value={position}
        data={positionList}
        onChange={p => setPosition(p)}
        style={{ width: 100, marginInlineEnd: 12 }}
      />

      <Button onClick={() => toggle(true)}>click me</Button>

      <Modal
        title="Form"
        key={position}
        footer={footer()}
        visible={visible}
        position={position}
        onClose={() => toggle(false)}
      >
        <Form labelWidth={100} labelAlign="right" style={{ width: 500 }} onSubmit={() => toggle(false)}>
          <Form.Item required label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item required label="Password">
            <Input name="password" type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
