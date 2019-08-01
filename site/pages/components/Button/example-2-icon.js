/**
 * cn - 图标
 *    -- shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入
 * en - Icon
 *    -- shineout does not provide built-in icons, you can add it to the content by yourself.
 */
import React from 'react'
import { Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function() {
  return (
    <div>
      <Button type="primary">
        <FontAwesome name="home" />
        left
      </Button>
      <Button type="primary">
        right
        <FontAwesome name="home" />
      </Button>
      <Button type="primary">
        ce
        <FontAwesome name="home" />
        ter
      </Button>
    </div>
  )
}
