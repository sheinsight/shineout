/**
 * cn - 基础
 * en - Base
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
      <Dropdown placeholder="Bottom Left" width={160} position="bottom-left">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Bottom Right" width={160} position="bottom-right">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Top Left" width={160} position="top-left">
        {menu}
      </Dropdown>

      <Dropdown placeholder="Top Right" width={160} position="top-right">
        {menu}
      </Dropdown>
    </Fragment>
  )
}
