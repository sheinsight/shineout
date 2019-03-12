/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in.
 */
import React from 'react'
import { Popover } from 'shineout'

const positions = [
  [null, 'bottom-left', 'bottom', 'bottom-right', null],
  ['right-top', null, null, null, 'left-top'],
  ['right', null, null, null, 'left'],
  ['right-bottom', null, null, null, 'left-bottom'],
  [null, 'top-left', 'top', 'top-right', null],
]

const style = {
  width: 100,
  textAlign: 'center',
  lineHeight: '30px',
  margin: 4,
  display: 'inline-block',
  border: 'solid 1px #eee',
  cursor: 'pointer',
}

export default function() {
  return positions.map((row, i) => (
    <div key={i}>
      {row.map((p, j) =>
        p ? (
          <div key={j} style={style}>
            <Popover trigger="click" position={p}>
              <div style={{ width: 240, padding: 30 }}>Some text</div>
            </Popover>
            {p}
          </div>
        ) : (
          <div key={j} style={{ ...style, border: 0 }} />
        )
      )}
    </div>
  ))
}
