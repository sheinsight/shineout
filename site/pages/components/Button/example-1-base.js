/**
 * cn - 基本用法
 *    -- Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)
 * en - Base
 *    -- Button has several built-in type, default, primary, secondary, success, warning, dange, and link.
 */
import React from 'react'
import { Button } from 'shineout'

export default function() {
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
