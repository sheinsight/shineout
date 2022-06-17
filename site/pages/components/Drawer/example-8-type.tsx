/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React, { useState } from 'react'
import { Drawer, Button, Select, TYPE } from 'shineout'

type SelectProps<Item = any, Value = any> = TYPE.Select.Props<Item, Value>
type SelectData = SelectProps['data']
type SelectOnChange = SelectProps['onChange']

type DrawerProps = TYPE.Drawer.Props
type DrawerType = DrawerProps['type']
type DrawerFooter = DrawerProps['footer']
type DrawerOnClose = DrawerProps['onClose']
type DrawerVisible = DrawerProps['visible']

const App: React.FC = () => {
  const [type, setType] = useState<DrawerType>('success')
  const [visible, setVisible] = useState<DrawerVisible>(false)

  const data: SelectData = ['info', 'success', 'warning', 'error']

  const handleChange: SelectOnChange = value => setType(value)

  const handleCancel: DrawerOnClose = () => {
    setVisible(false)
    console.log('clicked cancel')
  }

  const handleOk = () => {
    setVisible(false)
    console.log('clicked ok!')
  }

  const renderFooter = (): DrawerFooter => [
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button key="ok" type="primary" onClick={handleOk}>
      Ok
    </Button>,
  ]

  const show = () => {
    setVisible(true)
  }

  return (
    <div>
      <Select data={data} value={type} style={{ width: 100, marginInlineEnd: 12 }} keygen onChange={handleChange} />

      <Button onClick={show}>click me</Button>

      <Drawer
        type={type}
        width={500}
        visible={visible}
        onClose={handleCancel}
        footer={renderFooter()}
        title={`Drawer Title with ${type} Icon`}
      >
        <span>Drawer type: </span>
        <b>{type}</b>
      </Drawer>
    </div>
  )
}

export default App
