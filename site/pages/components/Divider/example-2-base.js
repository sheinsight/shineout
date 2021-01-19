/**
 * cn - 带文字的分割线
 *   -- 分割线中带有文字，可以用 orientation 指定文字位置。
 * en - Divider with title
 *  --Divider with inner title, set orientation="left/right" to align it.
 */
import React from 'react'
import { Divider } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

export default function() {
  return (
    <div>
      <p>{lorem(1)}</p>
      <Divider>Text</Divider>
      <p>{lorem(3)}</p>
      <Divider orientation="left">Left Text</Divider>
      <p>{lorem(4)}</p>
      <Divider orientation="right">Right Text</Divider>
      <p>{lorem(5)}</p>
    </div>
  )
}
