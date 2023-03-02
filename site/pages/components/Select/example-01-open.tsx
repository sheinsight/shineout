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
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button id="control" onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
        弹层
      </Button>
      <div style={{ margin: '10px 0' }}>
        <Select open={open} keygen style={{ width: 240 }} data={data} />
      </div>
    </div>
  )
}

export default App
