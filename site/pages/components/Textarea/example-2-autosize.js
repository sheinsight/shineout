/**
 * cn - 自适应高度
 *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 style.maxHeight 即可
 * en - Autosize
 */
import React from 'react'
import { Textarea } from 'shineout'

export default function () {
  return (
    <Textarea rows={2} autosize style={{ maxHeight: 200 }} placeholder="autosize" />
  )
}
