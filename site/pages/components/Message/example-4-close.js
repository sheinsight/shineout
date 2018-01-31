/**
 * cn - 回调 onClose
 * en - Event onClose
 */
import React, { Fragment } from 'react'
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
    <Fragment>
      <Button onClick={close}>Close</Button>
    </Fragment>
  )
}

