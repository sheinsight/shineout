/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in.
 */
import React from 'react'
import { Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverPosition = PopoverProps['position']

const positions: Array<PopoverPosition[]> = [
  [undefined, 'bottom-left', 'bottom', 'bottom-right', undefined],
  ['right-top', undefined, undefined, undefined, 'left-top'],
  ['right', undefined, undefined, undefined, 'left'],
  ['right-bottom', undefined, undefined, undefined, 'left-bottom'],
  [undefined, 'top-left', 'top', 'top-right', undefined],
]

const style: React.CSSProperties = {
  width: 100,
  textAlign: 'center',
  lineHeight: '30px',
  margin: 4,
  display: 'inline-block',
  border: 'solid 1px #eee',
  cursor: 'pointer',
}

const App: React.FC = () => (
  <div>
    {positions.map((row, i) => (
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
    ))}
  </div>
)

export default App
