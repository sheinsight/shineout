/**
 * cn - T:content
 *    --
 * en - T:content
 *    --
 */
import React from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverContent = PopoverProps['content']

const style: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => {
  const content: PopoverContent = <div style={style}>Some text</div>

  return (
    <Popover trigger="hover" content={content}>
      <Button>Hover</Button>
    </Popover>
  )
}

export default App
