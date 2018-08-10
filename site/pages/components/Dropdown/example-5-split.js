/**
 * cn - 组合
 *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
 * en - Group
 *    --It is used in combination in Button.Group, and usually used to hide less common options in a group of buttons.
 */
import React from 'react'
import { Dropdown, Message, Button } from 'shineout'

const menu = [
  {
    content: 'First',
  },
  {
    content: 'Second',
    target: '_blank',
    url: 'http://www.google.com',
  },
]

export default function () {
  return (
    <Button.Group>
      <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>
      <Button>Center</Button>
      <Dropdown
        onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}
        position="bottom-right"
        data={menu}
      />
    </Button.Group>
  )
}

