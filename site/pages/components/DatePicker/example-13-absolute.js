/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)
 */
import React from 'react'
import { DatePicker } from 'shineout'

export default function() {
  return (
    <div style={{ padding: 10, height: 150, overflow: 'hidden' }}>
      <DatePicker
        formatResult="yyyy-MM-dd HH:mm:ss"
        format="t"
        type="datetime"
        absolute
        defaultValue={new Date()}
        style={{ marginBottom: 8 }}
      />
      <br />
      <DatePicker inputable absolute range defaultValue={['2018-05-25', '2018-06-05']} style={{ marginBottom: 8 }} />
      <br />
      <DatePicker absolute type="time" defaultValue={Date.now()} />
    </div>
  )
}
