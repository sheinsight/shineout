/**
 * cn - 禁用
 * en - Disabled
 */
import React from 'react'
import { Dropdown } from 'shineout'

export default function () {
  const menu = [
    {
      content: 'First',
    },
    {
      content: 'Second',
      url: 'http://www.google.com',
    },
  ]

  return (
    <Dropdown disabled placeholder="Disabled" data={menu} />
  )
}

