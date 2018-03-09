/**
 * cn - 组合 \n 可以放在 Button.Group 中使用
 * en - Group
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
      <Button onClick={() => Message.info('The button clicked.')}>Click me</Button>
      <Dropdown
        onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}
        position="bottom-right"
        data={menu}
      />
    </Button.Group>
  )
}

