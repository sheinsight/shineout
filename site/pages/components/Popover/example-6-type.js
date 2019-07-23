/**
 * cn - 样式
 *    -- 内置四种样式
 * en - Type
 *    -- Four styles are built in.
 */
import React from 'react'
import { Popover } from 'shineout'

const types = ['success', 'info', 'warning', 'danger']

const style = {
  width: 100,
  textAlign: 'center',
  lineHeight: '30px',
  margin: 4,
  display: 'inline-block',
  border: 'solid 1px #eee',
}

export default function() {
  return types.map((t, i) => (
    <div style={style} key={i}>
      <Popover type={t} style={{ width: 200, padding: 20 }}>
        Some text
      </Popover>
      {t}
    </div>
  ))
}
