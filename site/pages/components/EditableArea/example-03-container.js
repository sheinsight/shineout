/**
 * cn - 自定义容器
 *    -- 使用 getPopupContainer 指定渲染的目标容器
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react'
import { EditableArea } from 'shineout'

export default function () {
  return (
    <div id="popup-target" style={{ height: 200, overflowY: 'auto', position: 'relative', paddingLeft: 16 }}>
      <div style={{ height: 140 }} />
      <EditableArea
        bordered
        value="使用 getPopupContainer 指定渲染的目标容器"
        getPopupContainer={() => document.querySelector('#popup-target')}
        maxHeight={100}
      />
      <div style={{ height: 140 }} />
    </div>
  )
}
