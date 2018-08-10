/**
 * cn - 自适应高度
 *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 * en - Autosize
 *    -- When the autosize property is true, rows is the minimum height. If you want to set the maximum height, use maxHeight.
 */
import React from 'react'
import { Textarea } from 'shineout'

export default function () {
  return (
    <Textarea rows={2} autosize maxHeight={200} placeholder="autosize" />
  )
}
