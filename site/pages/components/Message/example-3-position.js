/**
 * cn - 位置 position
 * en - Position Center
 */
import React, { Fragment } from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const middle = () => Message.info('some message.', 3, { position: 'middle' })
  return (
    <Fragment>
      <Button onClick={middle}>Show in the middle.</Button>
    </Fragment>
  )
}

