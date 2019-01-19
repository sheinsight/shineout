/**
 * cn - 大小
 *    -- 提供了三种尺寸的输入框，small、default、large
 * en - Size
 *    -- There are three size of input, small, default, large.
 */
import React from 'react'
import { Input } from 'shineout'

const style = { width: 120, marginRight: 12 }

export default function() {
  return (
    <div>
      <Input size="small" style={style} placeholder="small size" />
      <Input style={style} placeholder="default size" />
      <Input size="large" style={style} placeholder="large size" />
    </div>
  )
}
