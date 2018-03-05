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
    <Button.Group size="small">
      <Button type="primary" onClick={() => Message.info('The button clicked.')}>Click me</Button>
      <Dropdown
        onClick={content => Message.info(`The Dropdown clicked ${content}.`)}
        //  if you choose the substantive button to handle the event,
        //  you may add this props or add "style" to cover
        buttonSplit
        position="top-left"
        type="primary"
        placeholder=""
        data={menu}
      />
    </Button.Group>
  )
}

