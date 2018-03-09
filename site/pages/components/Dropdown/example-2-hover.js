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
    url: 'http://www.google.com',
    id: '2',
    children: [{
      content: 'topic 2',
      id: 4,
      children: [{
        id: '6',
        content: 'topic 3',
      }],
    }],
  }]

  return (
    <Dropdown hover placeholder="Hover" data={menu} />
  )
}

