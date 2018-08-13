/**
 * cn - 基本用法
 *    -- Button 内置了几种常用的样式，通过 type 来使用
 * en - Base
 *    -- Button has several built-in styles, used by type.
 */
import React from 'react'
import { Button } from 'shineout'

export default function () {
  return (
    <div>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </div>
  )
}
