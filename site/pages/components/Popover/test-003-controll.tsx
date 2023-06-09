/**
 * cn - 受控加载dom
 *    -- 当 popover 受控时，检查是否加载 dom
 */
import React, { useState } from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverOnVisibleChange = PopoverProps['onVisibleChange']

const style: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => {
  const [visible, setVisible] = useState(true)

  const onVisibleChange: PopoverOnVisibleChange = v => setVisible(v)

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>{visible ? 'Close' : 'Open'}</Button>
      <Button>
        <Popover visible={visible} onVisibleChange={onVisibleChange} style={style}>
          Some text
        </Popover>
        Hover
      </Button>
    </div>
  )
}

export default App
