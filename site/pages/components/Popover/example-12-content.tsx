/**
 * cn - 默认样式
 *    -- Popover.Content 添加 padding 和  maxLength 的默认样式
 * en - default style
 *    -- Popover.Content adds default styles for padding and maxLength
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <Button>
      <Popover.Content>
        <span> hello world </span>
      </Popover.Content>
      content
    </Button>
  )
}
