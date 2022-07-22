/**
 * cn - 弹出位置
 *    -- 设置 positoin 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。
 * en - Notification
 *    -- Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right.
 */
import React, { useState } from 'react'
import { Button, Message, Select, TYPE } from 'shineout'

type MessageProps = TYPE.Message.Props
type MessagePosition = MessageProps['position']

const App: React.FC = () => {
  const [position, setPosition] = useState<MessagePosition>('top-right')

  const show = () => {
    Message.info(<div style={{ width: 240 }}>some message.</div>, 3, {
      position,
      title: 'notify title',
    })
  }

  return (
    <div>
      position:
      <Select
        keygen
        width={200}
        value={position}
        onChange={setPosition}
        style={{ margin: '0 20px' }}
        data={['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right']}
      />
      <Button onClick={show}>Show message.</Button>
    </div>
  )
}

export default App
