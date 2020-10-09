/**
 * cn - 手动关闭
 *    -- Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage
 * en - Close
 *    -- Message return close func async
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default () => {
  const msg = async () => {
    const close = await Message.success(
      <div>
        I will always show until
        <a onClick={() => close()}> manually closed</a>
      </div>,
      0
    )
  }
  return <Button onClick={msg}>Manual Close</Button>
}
