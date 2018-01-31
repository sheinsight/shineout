/**
 * cn - hover 触发
 * en - Hover
 */
import React, { Fragment } from 'react'
import { Dropdown } from 'shineout'

export default function () {
  const menu = [
    <a key={1}>Link 1</a>,
    <a key={2}>Link 2</a>,
    <hr key={3} />,
    <a key={4}>Link 3</a>,
  ]

  return (
    <Fragment>
      <Dropdown hover placeholder="Hover">
        {menu}
      </Dropdown>
    </Fragment>
  )
}

