/**
 * cn - 确认
 *    -- Popover.Confirm 提供弹出气泡式的确认框
 * en - Confirm
 *    -- Popover.Confirm provide popover confirm.
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default function() {
  return (
    <Button>
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
        Are you sure delete ?
      </Popover.Confirm>
      Delete
    </Button>
  )
}
