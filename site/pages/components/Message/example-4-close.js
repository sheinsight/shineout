/**
 * cn - 关闭回调
 *    -- onClose 属性处理消息关闭事件
 * en - Close
 *    -- Set onClose to handle close event.
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const close = () => {
    Message.warn('Close this message will display another message.', 0, {
      onClose: () => {
        Message.info('You can close the message now.')
      },
    })
  }

  return (
    <Button onClick={close}>Close</Button>
  )
}

