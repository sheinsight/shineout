/**
 * cn - 图标 icon
 * en - with icon
 */
import React from 'react'
import { Alert } from 'shineout'

export default function () {
  return (
    <div>
      <Alert type="success" icon>Success Type.</Alert>
      <Alert type="info" icon>Info Type.</Alert>
      <Alert type="warning" icon>Warning Type.</Alert>
      <Alert type="danger" icon>Danger Type.</Alert>

      <Alert icon iconSize={24}>
        <h3>Set iconSize</h3>
        iconSize=24
      </Alert>
    </div>
  )
}
