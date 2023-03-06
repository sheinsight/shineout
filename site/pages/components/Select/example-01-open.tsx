/**
 * cn - 控制弹层（受控）
 *    -- Select 通过 open 控制弹层的显示和隐藏
 * en -  Dropdown list controlled by open property
 *    -- The dropdown list of Select controlled by open property
 */
import React, { useState } from 'react'
import { Select, Button } from 'shineout'

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <Button id="control" onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
        弹层
      </Button>
      <div style={{ margin: '10px 0', height: open ? 280 : 30 }}>
        <Select
          open={open}
          onCollapse={() => {
            console.log('关闭弹层')
          }}
          keygen
          style={{ width: 240 }}
          data={data}
        />
      </div>
    </div>
  )
}

export default App
