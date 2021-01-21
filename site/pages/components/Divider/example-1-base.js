/**
 * cn - 基本用法
 *  --默认为水平分割线
 * en - Base
 *  --Divider is horizontal by default. You can add text within Divider.
 */
import React from 'react'
import { Divider } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

export default function() {
  return (
    <div>
      <p>{lorem(1)}</p>
      <Divider />
      <p>{lorem(3)}</p>
      <Divider />
      <p>{lorem(5)}</p>
    </div>
  )
}
