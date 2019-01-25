/**
 * cn - 自适应高度
 *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 * en - Autosize
 *    -- When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.
 */
import React from 'react'
import { Textarea } from 'shineout'

const text = `a
u
t
o
s
i
z
e`

export default function() {
  return (
    <div>
      <Textarea rows={2} autosize maxHeight={200} placeholder="autosize" />
      <br />
      <Textarea rows={2} autosize value={text} maxHeight={200} placeholder="autosize" />
    </div>
  )
}
