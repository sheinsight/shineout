/**
 * cn - 透明背景
 * en - Outline
 */
import React from 'react'
import { Button } from 'shineout'

export default function () {
  return (
    <div>
      <Button outline type="primary">Primary</Button>
      <Button outline type="secondary">Secondary</Button>
      <Button outline type="success">Success</Button>
      <Button outline type="info">Info</Button>
      <Button outline type="warning">Warning</Button>
      <Button outline type="danger">Danger</Button>
    </div>
  )
}
