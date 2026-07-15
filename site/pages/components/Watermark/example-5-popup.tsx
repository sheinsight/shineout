/**
 * cn - 弹层继承
 *    -- 默认情况下，Watermark 内的 Modal 和 Drawer 会继承相同的水印。
 * en - Popup inheritance
 *    -- Modal and Drawer inside Watermark inherit the same watermark by default.
 */
import React, { useState } from 'react'
import { Button, Drawer, Gap, Modal, Watermark } from 'shineout'

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
    <Watermark content="INTERNAL" style={{ padding: 24, border: '1px solid #e8e8e8' }}>
      <Gap>
        <Button onClick={() => setModalVisible(true)}>Open Modal</Button>
        <Button onClick={() => setDrawerVisible(true)}>Open Drawer</Button>
      </Gap>
      <Modal
        visible={modalVisible}
        title="Review details"
        onClose={() => setModalVisible(false)}
        footer={<Button onClick={() => setModalVisible(false)}>Close</Button>}
      >
        Protected modal content
      </Modal>
      <Drawer visible={drawerVisible} title="Activity" onClose={() => setDrawerVisible(false)}>
        Protected drawer content
      </Drawer>
    </Watermark>
  )
}

export default App
