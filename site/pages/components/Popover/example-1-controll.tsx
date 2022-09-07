/**
 * cn - 受控
 *    -- 可以通过 visible 去控制
 * en -  controll
 *    -- Use cisible to controll the show/hidden
 */
import React, { useState } from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverOnVisibleChange = PopoverProps['onVisibleChange']

const style: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const onVisibleChange: PopoverOnVisibleChange = v => setVisible(v)

  return (
    <Button>
      <Popover visible={visible} onVisibleChange={onVisibleChange} style={style}>
        Some text
      </Popover>
      Hover
    </Button>
  )
}

export default App
