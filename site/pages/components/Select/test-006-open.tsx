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
      <Button id="control" onClick={() => setOpen(true)}>
        打开弹层
      </Button>
      <div style={{ margin: '10px 0', height: 250 }}>
        <Select
          open={open}
          onCollapse={v => {
            setOpen(v)
            console.log('控制弹层（受控）：', v)
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
