/**
 * cn - 嵌套使用
 *    -- 使用多个 Popover 进行嵌套展示
 * en - Nested of Popovers
 *    -- Using more than one Popover by nested
 */
import React, { useState } from 'react'
import { Button, Popover, TYPE } from 'shineout'

type PopoverProps = TYPE.Popover.Props
type PopoverConfirmProps = TYPE.Popover.ConfirmProps
type PopoverOnOk = PopoverConfirmProps['onOk']
type PopoverText = PopoverConfirmProps['text']
type PopoverOnCancel = PopoverConfirmProps['onCancel']
type PopoverOnVisibleChange = PopoverProps['onVisibleChange']

const style: React.CSSProperties = { padding: '4px 8px' }

const App: React.FC = () => {
  const [show, setshow] = useState(false)

  const text: PopoverText = { ok: 'Yes', cancel: 'No' }

  const onOk: PopoverOnOk = () =>
    new Promise(resolve => {
      console.log('ok')
      setTimeout(() => resolve(true), 2000)
    })

  const onCancel: PopoverOnCancel = () => console.log('cancel')

  const onVisibleChange: PopoverOnVisibleChange = v => setshow(v)

  return (
    <Button>
      <Popover style={style} trigger="hover" onVisibleChange={onVisibleChange}>
        <Button>
          {show && (
            <Popover.Confirm onCancel={onCancel} onOk={onOk} text={text}>
              Hello Sheinout
            </Popover.Confirm>
          )}
          Nested
        </Button>
      </Popover>
      Hover
    </Button>
  )
}

export default App
