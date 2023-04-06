/**
 * cn - 控制弹层（受控）
 *    -- DatePicker 通过 open 控制弹层的显示和隐藏。请注意，将面板设置成常开时，建议同时设置 position 属性，否则面板易遮挡其他内容。
 * en -  Dropdown list controlled by open property
 *    -- The dropdown list of Datepicker controlled by open property
 */
import React, { useState } from 'react'
import { DatePicker, Button } from 'shineout'

const stlye = {
  width: 300,
}
const App: React.FC = () => {
  const [open, setOpen] = useState(true)
  const handleClose = (close: boolean) => {
    setOpen(close)
    console.log('控制弹层（受控）:', close)
  }
  return (
    <div>
      <div style={{ margin: '10px 0' }}>
        <Button id="control" onClick={() => setOpen(true)}>
          打开弹层
        </Button>
      </div>
      <div style={{ height: 350 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={stlye}>
            <DatePicker
              open={open}
              onCollapse={handleClose}
              type="date"
              placeholder="Select date"
              position="left-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
