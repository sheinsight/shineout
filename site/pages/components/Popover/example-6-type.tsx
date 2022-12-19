/**
 * cn - 样式
 *    -- 内置四种样式
 * en - Type
 *    -- Four styles are built in.
 */
import React from 'react'
import { Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props

const types: PopoverProps['type'][] = ['success', 'info', 'warning', 'danger']

const style: React.CSSProperties = {
  margin: 4,
  width: 100,
  lineHeight: '30px',
  textAlign: 'center',
  display: 'inline-block',
  border: 'solid 1px #eee',
}

const popoverStyle: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => (
  <div>
    {types.map((t, i) => (
      <div style={style} key={i}>
        <Popover type={t} style={popoverStyle}>
          Some text
        </Popover>
        {t}
      </div>
    ))}
  </div>
)

export default App
