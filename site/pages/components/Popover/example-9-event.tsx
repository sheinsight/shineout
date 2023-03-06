/**
 * cn - 事件
 *    -- 提供了onOpen 和 onClose 事件
 * en - Events
 *    -- provider onOpen and onClose event
 */
import React from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverOnOpen = PopoverProps['onOpen']
type PopoverOnClose = PopoverProps['onClose']

const style: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => {
  const open: PopoverOnOpen = () => console.log('popover open')
  const close: PopoverOnClose = () => console.log('popover close')

  return (
    <Button>
      <Popover onOpen={open} onClose={close} trigger="click" style={style}>
        Some text
      </Popover>
      Click me.
    </Button>
  )
}

export default App
