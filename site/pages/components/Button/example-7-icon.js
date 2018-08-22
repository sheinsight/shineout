/**
 * cn - 图标
 *    -- 需要图标可以在内容中自行加入
 * en - Icon
 *    -- If you need a icon, you can add it to the content by yourself.
 */
import React from 'react'
import { Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div>
      <Button size="small" type="primary"><FontAwesome name="home" /> Small</Button>
      <Button type="primary">Default <FontAwesome name="home" /></Button>
      <Button size="large" type="primary"><FontAwesome name="home" /> Large</Button>
    </div>
  )
}
