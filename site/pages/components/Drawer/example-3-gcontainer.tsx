/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Drawer 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React, { useState } from 'react'
import { Button, Drawer, TYPE } from 'shineout'

type DrawerProps = TYPE.Drawer.Props
type DrawerContainer = DrawerProps['container']

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [wrapper, setWrapper] = useState<DrawerContainer>()

  const handleDismiss = () => {
    setVisible(false)
  }

  const show = () => {
    setVisible(true)
  }

  return (
    <div ref={ref => setWrapper(ref!)}>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        visible={visible}
        container={wrapper}
        title="Drawer Title"
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
        Drawer mount after Button
      </Drawer>
    </div>
  )
}

export default App
