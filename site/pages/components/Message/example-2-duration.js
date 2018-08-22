/**
 * cn - 显示时长
 *    -- 通过 duration 属性可以控制消息显示的时长，默认为3秒，设为 0 时，需要用户手动关闭
 * en - Duration
 *    -- Set duration property to control the duration of the message display. The default value is 3 seconds.
 *    -- When duration is set to 0, the message will not hide automatically.
 */
import React from 'react'
import { Button, Message } from 'shineout'

const s10 = () => Message.info('This message will close after 10 seconds.', 10)
const s0 = () => Message.error('This message will not close utill click the close icon.', 0)

export default function () {
  return (
    <div>
      <Button onClick={s10}>duration 10 s.</Button>
      <Button onClick={s0}>duration 0 s.</Button>
    </div>
  )
}

