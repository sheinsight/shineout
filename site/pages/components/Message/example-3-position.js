/**
 * cn - 位置 position
 * en - Position Center
 */
import React from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const middle = () => {
    Message.info('some message.', 3, { position: 'middle' })
  }

  return (
    <Button onClick={middle}>Show in the middle.</Button>
  )
}

