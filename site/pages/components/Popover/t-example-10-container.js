/**
 * cn - 自定义容器
 *    -- 使用 getPopupContainer 指定渲染的目标容器
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <div id="popup-target" style={{ height: 200, overflowY: 'auto', position: 'relative' }}>
      <Button style={{ margin: '100px 0' }}>
        Scrollable
        <Popover
          trigger="click"
          style={{ padding: '8px 16px' }}
          getPopupContainer={() => document.querySelector('#popup-target')}
        >
          render in parent element
        </Popover>
      </Button>
    </div>
  )
}
