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
    children: [{
      content: 'link1',
      id: '4',
    }, {
      content: 'link2',
      id: '5',
    }],
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    id: '2',
    children: [{
      content: 'link3',
      id: 6,
      onClick: () => { console.log('this is special') },
    }, {
      content: 'link4',
      id: 7,
    }],
  }]
  const width = 100

  return (
    <Fragment>
      <Dropdown placeholder="Right Top" width={width} position="right-top" data={menu} />

      <Dropdown placeholder="Bottom Left" width={width} position="bottom-left" data={menu} />

      <Dropdown placeholder="Bottom Right" width={width} position="bottom-right" data={menu} />

      <Dropdown placeholder="Left Top" width={width} position="left-top" data={menu} />

      <br />

      <Dropdown placeholder="Right Bottom" width={width} position="right-bottom" data={menu} />

      <Dropdown placeholder="Top Left" width={width} position="top-left" data={menu} />

      <Dropdown placeholder="Top Right" width={width} position="top-right" data={menu} />

      <Dropdown placeholder="Left Bottom" width={width} position="left-bottom" data={menu} />
    </Fragment>
  )
}
