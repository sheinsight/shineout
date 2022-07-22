/**
 * cn - 位置
 *    -- 通过 position 可设置 Drawer 弹出的位置, 现支持 top、right、bottom 和 left 四个位置配置。
 * en - Position
 *    -- Set position property to specify the pop-up position.
 */
import React, { useState } from 'react'
import { Drawer, Button, Form, Input, Select, TYPE } from 'shineout'

type DrawerProps = TYPE.Drawer.Props
type DrawerFooter = DrawerProps['footer']
type DrawerOnClose = DrawerProps['onClose']
type DrawerPosition = DrawerProps['position']

type ButtonProps = TYPE.Button.Props
type ButtonOnClick = ButtonProps['onClick']

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<DrawerPosition>('right')

  const handleClose: DrawerOnClose = () => {
    setVisible(false)
  }

  const handleOpen: ButtonOnClick = () => {
    setVisible(true)
  }

  const renderFooter = (): DrawerFooter => (
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  )

  return (
    <div>
      <Select
        keygen
        value={position}
        onChange={p => setPosition(p)}
        data={['top', 'right', 'bottom', 'left']}
        style={{ width: 100, marginInlineEnd: 12 }}
      />

      <Button onClick={handleOpen}>click me</Button>

      <Drawer
        width={500}
        title="Form"
        key={position}
        visible={visible}
        position={position}
        footer={renderFooter()}
        onClose={handleClose}
      >
        <Form labelWidth={100} labelAlign="right" onSubmit={handleClose}>
          <Form.Item required label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item required label="Password">
            <Input name="password" type="password" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default App
