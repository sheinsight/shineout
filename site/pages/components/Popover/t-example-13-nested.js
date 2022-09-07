/**
 * cn - 嵌套使用
 *    -- 使用多个 Popover 进行嵌套展示
 * en - Nested of Popovers
 *    -- Using more than one Popover by nested
 */
import React, { useState } from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  const [show, setshow] = useState(false)
  const onVisibleChange = v => {
    setshow(v)
  }
  return (
    <Button>
      <Popover style={{ padding: '4px 8px' }} trigger="hover" onVisibleChange={onVisibleChange}>
        <Button>
          {show && (
            <Popover.Confirm
              onCancel={() => {
                console.log('cancel')
              }}
              onOk={() =>
                new Promise(resolve => {
                  console.log('ok')
                  setTimeout(() => resolve(true), 2000)
                })
              }
              text={{ ok: 'Yes', cancel: 'No' }}
            >
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
