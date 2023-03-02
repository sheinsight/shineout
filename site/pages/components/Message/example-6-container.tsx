/**
 * cn - 指定容器
 *    -- 使用 container 来指定 Message 渲染的目标节点
 * en - Target
 *    -- Set container to render target node
 */
import React, { useRef } from 'react'
import { Button, Message } from 'shineout'

const App: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div ref={container} id="container" style={{ width: 100, height: 100, background: '#ebebeb' }}>
        <Button
          id="button"
          onClick={() => {
            Message.show('Some message.', 3, {
              container: container.current || undefined,
            })
          }}
        >
          Show
        </Button>
      </div>
    </div>
  )
}
export default App
