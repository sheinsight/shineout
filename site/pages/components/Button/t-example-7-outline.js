/**
 * cn - 透明背景
 *    -- 添加 outline 属性可以设置为透明背景，type 不能为 default 和 link。
 * en - Outline
 *    -- Adding outline property can set background to transparent. Outline type can not be default and link.
 */
import React from 'react'
import { Button } from 'shineout'

export default function() {
  return (
    <div>
      <Button outline type="primary">
        Primary
      </Button>
      <Button outline type="secondary">
        Secondary
      </Button>
      <Button outline type="success">
        Success
      </Button>
      <Button outline type="warning">
        Warning
      </Button>
      <Button outline type="danger">
        Danger
      </Button>
    </div>
  )
}
