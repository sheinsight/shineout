/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Dropdown } from 'shineout'

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
    <Dropdown disabled placeholder="Disabled" data={menu} />
  )
}

