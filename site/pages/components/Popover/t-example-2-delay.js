/**
 * cn - 延迟
 *    -- 可以设置展示延时和关闭延时
 * en - delay
 *    -- the hidden/show delay
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <Button>
      <Popover mouseEnterDelay={1000} mouseLeaveDelay={1000} style={{ width: 200, padding: 20 }}>
        Some text
      </Popover>
      Hover
    </Button>
  )
}
