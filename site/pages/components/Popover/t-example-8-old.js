/**
 * cn - 旧API
 *    -- 旧接口使用 Popover 包在组件外使用，通过 content 传递内容，已不推荐
 * en - Old API
 *    -- Old API, is out of date.
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  const content = <div style={{ width: 200, padding: 20 }}>Some text</div>
  return (
    <Popover content={content}>
      <Button>Hover</Button>
    </Popover>
  )
}
