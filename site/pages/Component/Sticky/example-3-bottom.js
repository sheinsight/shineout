/**
 * cn - 附着在底部
 * en - Sticky to bottom
 */
import React from 'react'
import Sticky from 'shineout/Sticky'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Sticky bottom={0}>
      <Alert style={{ marginBottom: 0 }} onClose>
        Sticky at bottom.
      </Alert>
    </Sticky>
  )
}
