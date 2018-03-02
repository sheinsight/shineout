/**
 * cn - hover 触发
 * en - Hover
 */
import React from 'react'
import { Dropdown } from 'shineout'

export default function () {
  const menu = [{
    content: 'First',
    id: '1',
    children: [{
      id: '3',
      content: 'optic 1',
    }],
  }, {
    content: 'Second',
    url: 'www.baidu.com',
    id: '2',
    children: [{
      content: 'topic 2',
      id: 4,
    }],
  }]

  return (
    <Dropdown hover placeholder="Hover" data={menu} />
  )
}

