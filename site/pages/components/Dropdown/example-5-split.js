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
    url: 'http://www.google.com',
    id: '2',
  }]
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

