/**
 * cn - Button事件
 * en - Button event
 */
import React from 'react'
import { Dropdown, Message, Button } from 'shineout'

export default function () {
  const menu = [{
    content: 'First',
    id: '1',
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    id: '2',
  }]
  return (
    <Button.Group>
      <Button onClick={() => Message.info('The button clicked.')}>Click me</Button>
      <Dropdown
        onClick={content => Message.info(`The Dropdown clicked ${content}.`)}
        position="top-left"
        data={menu}
      />
    </Button.Group>
  )
}

