/**
 * cn - 旧API
 *    -- 旧接口使用 Popover 包在组件外使用，通过 content 传递内容，已不推荐
 * en - Old API
 *    -- Old API, is out of date.
 */
import React from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverContent = PopoverProps['content']

const style: React.CSSProperties = { width: 200, padding: 20 }

const App: React.FC = () => {
  const content: PopoverContent = <div style={style}>Some text</div>

  return (
    <Popover content={content}>
      <Button>Hover</Button>
    </Popover>
  )
}

export default App
