/**
 * cn - 选项多列平铺
 * en - Multiple columns
 */
import React from 'react'
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
  // for (let i = 1; i <= 30; i++) {
  //   menu.push((
  //     <a key={i} style={{ width: '20%', display: 'inline-block' }}>
  //       Item {i}
  //     </a>
  //   ))
  // }

  return (
    <Dropdown placeholder="Dropdown" width={500} data={menu} />
  )
}

