/**
 * cn - 手动关闭
 *    -- Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage
 * en - Close
 *    -- Message return close func async
 */
import React from 'react'
import { Button, Message, TYPE } from 'shineout'

type MessageProps = TYPE.Message.Props
type MessageClose = MessageProps['onClose']

const App: React.FC = () => {
  const msg: MessageClose = async () => {
    const close: any = await Message.success(
      <div>
        I will always show until
        <a onClick={() => close()}> manually closed</a>
      </div>,
      0
    )
  }

  return <Button onClick={msg}>Manual Close</Button>
}

export default App
