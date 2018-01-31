/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { Dropdown, Message } from 'shineout'

export default function () {
  const menu = [
    <a href="#/" key={1}>Home</a>,
    <a href="http://google.com" target="_blank" key={2}>Google</a>,
    <hr key={3} />,
    <a
      key={4}
      href="javascript:;"
      onClick={() => { Message.info('Clicked the dropdown button.') }}
    >
      Message
    </a>,
  ]

  return (
    <Fragment>
      <Dropdown placeholder="Default">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Link" type="link">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Primary" type="primary">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Outline" outline type="primary">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Small" size="small">
        {menu}
      </Dropdown>
    </Fragment>
  )
}
