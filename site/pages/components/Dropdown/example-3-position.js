/**
 * cn - 弹出位置 position
 * en - Position
 */
import React, { Fragment } from 'react'
import { Dropdown } from 'shineout'

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
    <Fragment>
      <Dropdown placeholder="Right Top" width={160} position="right-top" data={menu} />

      <Dropdown placeholder="Bottom Left" width={160} position="bottom-left" data={menu} />

      <Dropdown placeholder="Bottom Right" width={160} position="bottom-right" data={menu} />

      <Dropdown placeholder="Left Top" width={160} position="left-top" data={menu} />

      <br />

      <Dropdown placeholder="Right Bottom" width={160} position="right-bottom" data={menu} />

      <Dropdown placeholder="Top Left" width={160} position="top-left" data={menu} />

      <Dropdown placeholder="Top Right" width={160} position="top-right" data={menu} />

      <Dropdown placeholder="Left Bottom" width={160} position="left-bottom" data={menu} />
    </Fragment>
  )
}
