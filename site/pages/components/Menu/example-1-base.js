/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Menu } from 'shineout'

const data = [{
  id: '1',
  content: 'Home',
  children: [{
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
    <Menu data={data} />
  )
}
