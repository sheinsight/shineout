/**
 * cn - Button事件
 * en - Button event
 */
import React, { Fragment } from 'react'
import { Dropdown, Message } from 'shineout'

export default function () {
  const menu = [
    <a key={1}>Link 1</a>,
    <a key={2}>Link 2</a>,
    <hr key={3} />,
    <a key={4}>Link 3</a>,
  ]

  return (
    <Fragment>
      <Dropdown href="#/" position="top-left" hover placeholder="Link Home">
        {menu}
      </Dropdown>

      <Dropdown
        outline
        onClick={() => Message.info('The button clicked.')}
        position="top-left"
        type="primary"
        placeholder="Click me"
      >
        {menu}
      </Dropdown>
    </Fragment>
  )
}

