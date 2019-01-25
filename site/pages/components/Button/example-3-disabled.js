/**
 * cn - 不可用
 *    -- 添加 disabled 属性可以禁用按钮。
 * en - Disabled
 *    -- Adding disabled property can disable the button.
 */
import React from 'react'
import { Button } from 'shineout'

export default function() {
  return (
    <div>
      <Button disabled>Default</Button>
      <Button disabled type="primary">
        Primary
      </Button>
      <Button disabled type="secondary">
        Secondary
      </Button>
      <Button disabled type="success">
        Success
      </Button>
      <Button disabled type="warning">
        Warning
      </Button>
      <Button disabled type="danger">
        Danger
      </Button>
      <Button disabled type="link">
        Link
      </Button>
    </div>
  )
}
