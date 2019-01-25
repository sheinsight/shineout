/**
 * cn - 内置图标
 *    -- 设置 icon 属性可以显示内置的图标，不同类型的图标见示例
 * en - Icon
 *    -- Set the icon property to display the built-in icon.
 */
import React from 'react'
import { Alert } from 'shineout'

export default function() {
  return (
    <div>
      <Alert type="success" icon>
        Success Type.
      </Alert>
      <Alert type="info" icon>
        Info Type.
      </Alert>
      <Alert type="warning" icon>
        Warning Type.
      </Alert>
      <Alert type="danger" icon>
        Danger Type.
      </Alert>

      <Alert icon iconSize={24} style={{ padding: 20 }}>
        <h3>Set iconSize</h3>
        iconSize=24
      </Alert>
    </div>
  )
}
