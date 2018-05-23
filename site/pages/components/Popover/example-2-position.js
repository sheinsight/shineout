/**
 * cn - 弹出位置
 * en - Position
 */
import React from 'react'
import { Popover } from 'shineout'

const positions = [
  [null, 'top-left', 'top', 'top-right', null],
  ['left-top', null, null, null, 'right-top'],
  ['left', null, null, null, 'right'],
  ['left-bottom', null, null, null, 'right-bottom'],
  [null, 'bottom-left', 'bottom', 'bottom-right', null],
]

const style = {
  width: 100, textAlign: 'center', lineHeight: '30px', margin: 4, display: 'inline-block', border: 'solid 1px #eee',
}

export default function () {
  const content = <div style={{ width: 200, padding: 20 }}>Some text</div>
  return positions.map((row, i) => (
    <div key={i}>
      {
        row.map((p, j) =>
        (p ? (
          <Popover content={content} position={p} key={j}>
            <div style={style}>{p}</div>
          </Popover>
          )
         : <div key={j} style={{ ...style, border: 0 }} />))
      }
    </div>
  ))
}
