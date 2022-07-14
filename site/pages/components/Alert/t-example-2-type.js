/**
 * cn - 类型
 *    -- 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning
 * en - type
 *    -- There are four built-in types (styles), [success, info, warning, danger], the default value is warning.
 */
import React from 'react'
import { Alert } from 'shineout'

export default function() {
  return (
    <div>
      <Alert type="success">Success Type.</Alert>
      <Alert type="info">Info Type.</Alert>
      <Alert type="warning">Warning Type.</Alert>
      <Alert type="danger">Danger Type.</Alert>
    </div>
  )
}
