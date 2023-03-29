/**
 * cn - 隐藏遮罩
 *    -- 使用 hideMask 属性来隐藏遮罩
 * en - hide mask
 *    -- use hideMask property to hide mask
 */
import React, { useState } from 'react'
import { Drawer, Button } from 'shineout'

const App: React.FC = () => {
  const [content, setContent] = useState(1)
  const [visible, setVisible] = useState<boolean>(false)

  const handleCancel = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked cancel')
  }

  const handleOk = () => {
    setVisible(false)
    setContent(content + 1)
    console.log('clicked ok!')
  }

  const show = () => {
    setVisible(true)
  }

  return (
    <div>
      <Button onClick={show}>click me</Button>
      <Drawer
        width={400}
        hideMask
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
