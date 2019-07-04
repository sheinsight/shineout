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
        onOk={() => {
          console.log('ok')
        }}
        onCancel={() => {
          console.log('cancel')
        }}
        text={{ ok: 'Yes', cancel: 'No' }}
      >
        Are you sure delete ?
      </Popover.Confirm>
      Delete
    </Button>
  )
}
