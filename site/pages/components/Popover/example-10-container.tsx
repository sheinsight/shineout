/**
 * cn - 自定义容器
 *    -- 使用 getPopupContainer 指定渲染的目标容器
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react'
import { Button, Popover } from 'shineout'

const buttonStyle: React.CSSProperties = { margin: '100px 0' }
const popoverStyle: React.CSSProperties = { padding: '8px 16px' }
const targetStyle: React.CSSProperties = { height: 200, overflowY: 'auto', position: 'relative' }

const App: React.FC = () => (
  <div id="popup-target" style={targetStyle}>
    <Button style={buttonStyle}>
      Scrollable
      <Popover trigger="click" style={popoverStyle} getPopupContainer={() => document.querySelector('#popup-target')}>
        render in parent element
      </Popover>
    </Button>
  </div>
)

export default App
