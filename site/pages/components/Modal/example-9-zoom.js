/**
 * cn - 缩放动画
 *    -- 设置 zoom 属性来开启缩放动画
 * en - Zoom
 *    -- Set the zoom property to enable zoom animation
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal
        zoom
        width={400}
        title="zoom"
        footer={[
          <Button key="ok" type="primary" onClick={() => setVisible(false)}>
            Ok
          </Button>,
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  )
}
