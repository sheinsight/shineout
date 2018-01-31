/**
 * cn - 平铺选项
 * en - items
 */
import React, { Fragment } from 'react'
import { Dropdown } from 'shineout'

export default function () {
  const menu = []
  for (let i = 1; i <= 30; i++) {
    menu.push(<a key={i} style={{ width: '20%', display: 'inline-block' }}>Item {i}</a>)
  }

  return (
    <Fragment>
      <Dropdown placeholder="Dropdown" position="top-left" width={500}>
        {menu}
      </Dropdown>
    </Fragment>
  )
}

