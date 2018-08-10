/**
 * cn - 显示位置
 *    -- 默认情况下，消息显示在页面顶部，通过 position 可以修改为页面中间
 * en - Position
 *    -- By default, the message is displayed at the top of the page, and it can be modified to the middle of the page by position.
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const middle = () => {
    Message.info('some message.', 3, { position: 'middle' })
  }

  return (
    <Button onClick={middle}>Show in the middle.</Button>
  )
}

