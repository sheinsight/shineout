/**
 * cn - Button事件
 * en - Button event
 */
import React, { Fragment } from 'react'
import { Dropdown, Message, Button } from 'shineout'
import ButtonGroup from '../../../../src/Button/Group'

export default function () {
  // const menu = [
  //   <a key={1}>Link 1</a>,
  //   <a key={2}>Link 2</a>,
  //   <hr key={3} />,
  //   <a key={4}>Link 3</a>,
  // ]
  const menu = [{
    content: 'First',
    id: '1',
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    id: '2',
  }]
  return (
    <Fragment>
      <Button.Group size="small">
        <Button type="primary" onClick={() => Message.info('The button clicked.')}>Click me</Button>
        <Dropdown
          onClick={() => Message.info('The Dropdown clicked.')}
          style={{ borderRadius: 'none' }}
          position="top-left"
          type="primary"
          placeholder=""
          data={menu}
        />
      </Button.Group>
    </Fragment>
  )
}

