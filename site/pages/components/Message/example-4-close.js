/**
 * cn - 回调 onClose
 * en - Event onClose
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const close = () => {
    Message.warn('Close this message will display another message.', 0, {
      onClose: () => {
        Message.info('You can close the message now.')
      },
    })
  }

  return (
    <Button onClick={close}>Close</Button>
  )
}

