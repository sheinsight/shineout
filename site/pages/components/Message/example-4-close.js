/**
 * cn - 关闭回调
 *    -- 通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message。
 * en - Close
 *    -- Set onClose to handle close event.
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function() {
  const close = () => {
    Message.warn('Close this message will display another message.', 0, {
      onClose: () => {
        Message.info('You can close the message now.')
      },
    })
  }

  return <Button onClick={close}>Close callback</Button>
}
