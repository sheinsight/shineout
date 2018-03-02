/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [{
  id: '1',
  content: 'Home',
  children1: [{
    id: '3',
    content: 'Product',
  }, {
    id: '6',
    content: 'Buyer',
  }],
}, {
  id: '2',
  content: 'Index',
}]

export default function () {
  return (
    <Menu keygen={d => `${d.id}my`} data={data} defaultSelectKeys={['2my']} style={{ width: 156 }} />
  )
}
