/**
 * cn - 基本用法
 * en - Base
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
