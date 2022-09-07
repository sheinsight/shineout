/**
 * cn - 内置文本样式
 *    -- 当采用自定义函数渲染时，允许通过useTextStyle来使用采用内置的文本样式
 * en - useTextStyle
 *    -- Render by the innerstyle of text when the children prop is render function
 */
import React from 'react'
import { Button, Popover } from 'shineout'

const style: React.CSSProperties = { padding: '4px 8px' }

const App: React.FC = () => {
  const TextRender = () => <span>Hi !</span>

  return (
    <div>
      <Button>
        <Popover style={style} useTextStyle={false}>
          {TextRender}
        </Popover>
        defaultStyle
      </Button>

      <Button>
        <Popover style={style} useTextStyle>
          {TextRender}
        </Popover>
        useTextStyle
      </Button>
    </div>
  )
}
export default App
