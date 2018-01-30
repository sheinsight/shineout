/**
 * cn - 附着在底部
 * en - Sticky to bottom
 */
import React from 'react'
import { Alert, Sticky } from 'shineout'

export default function () {
  return (
    <Sticky bottom={0}>
      <Alert style={{ marginBottom: 0 }} onClose>
        Sticky at bottom.
      </Alert>
    </Sticky>
  )
}
