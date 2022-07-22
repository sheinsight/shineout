/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 *    -- Drawer 会在 document.body 中创建一个新的层显示弹出内容。
 *    -- 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性。
 * en - Base
 *    -- The basic usage for component.
 */
import React, { useState } from 'react'
import { Drawer, Button, TYPE } from 'shineout'

type DrawerProps = TYPE.Drawer.Props
type DrawerVisible = DrawerProps['visible']
type DrawerOnClose = DrawerProps['onClose']

type ButtonProps = TYPE.Button.Props
type ButtonOnClick = ButtonProps['onClick']

const App: React.FC = () => {
  const [content, setContent] = useState(1)
  const [visible, setVisible] = useState<DrawerVisible>(false)

  const handleCancel: DrawerOnClose = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked cancel')
  }

  const handleOk: ButtonOnClick = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked ok!')
  }

  const show: ButtonOnClick = () => {
    setVisible(true)
  }

  return (
    <div>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        visible={visible}
        title="Drawer Title"
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
      </Drawer>
    </div>
  )
}

export default App
