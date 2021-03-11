/**
 * cn - 可移动/伸缩
 *    -- 设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小
 * en - Moveable/resizable
 *    -- set moveable mark modal move by header, set resizable to resize modal
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default () => {
  const [show, setShow] = React.useState(false)
  return (
    <div>
      <Button onClick={() => setShow(true)}>Moveable modal</Button>
      <Modal
        moveable
        resizable
        width={400}
        visible={show}
        title="Moveable"
        onClose={() => setShow(false)}
        footer={<Button onClick={() => setShow(false)}>Confirm</Button>}
      >
        drag title to move
      </Modal>
    </div>
  )
}
