/**
 * cn - 多列平铺
 *    -- 设置 columns 属性可以让选项多列平铺
 * en - Multiple columns
 *    -- Set columns property can make the option multi-column tiled.
 */
import React from 'react'
import { Dropdown } from 'shineout'

export default function() {
  const menu = []
  for (let i = 1; i <= 30; i++) {
    menu.push({
      id: `${i}`,
      content: `item${i}`,
    })
  }

  return <Dropdown placeholder="Dropdown" width={500} columns={5} data={menu} />
}
