/**
 * cn - 图标
 *    -- 需要图标可以在内容中自行加入
 * en - Icon
 */
import React from 'react'
import { Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div>
      <Button size="small" type="primary"><FontAwesome name="home" /> Small</Button>
      <Button type="primary"><FontAwesome name="home" /> Default</Button>
      <Button size="large" type="primary"><FontAwesome name="home" /> Large</Button>
    </div>
  )
}
