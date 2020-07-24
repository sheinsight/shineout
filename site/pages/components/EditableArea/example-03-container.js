/**
 * cn - 自定义容器
 *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react'
import { EditableArea } from 'shineout'

export default function() {
  return (
    <div id="popup-target" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>
      <div style={{ height: 100 }} />
      <EditableArea
        bordered
        placeholder="scroll in container"
        getPopupContainer={() => document.querySelector('#popup-target')}
        maxHeight={100}
      />
      <div style={{ height: 140 }} />
    </div>
  )
}
