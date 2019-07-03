/**
 * cn - 大小
 *    -- 通过 size 设置 Switch 大小
 * en - Size
 *    -- size set
 */
import React from 'react'
import { Switch } from 'shineout'

export default function() {
  return (
    <div>
      <Switch />
      <br />
      <Switch size="small" />
    </div>
  )
}
