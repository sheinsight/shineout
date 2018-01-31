/**
 * cn - duration
 * en - duration
 */
import React, { Fragment } from 'react'
import { Button, Message } from 'shineout'

export default function () {
  const s10 = () => Message.info('This message will close after 10 seconds.', 10)
  const s0 = () => Message.error('This message will not close utill click the close button.', 0)
  return (
    <Fragment>
      <Button onClick={s10}>duration 10 s.</Button>
      <Button onClick={s0}>duration 0 s.</Button>
    </Fragment>
  )
}

