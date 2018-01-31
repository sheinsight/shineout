/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { Button, Message } from 'shineout'

export default function () {
  return (
    <Fragment>
      <Button onClick={() => { Message.show('Some message.') }}>Show</Button>
      <Button onClick={() => { Message.info('This is a message of info.') }}>Info</Button>
      <Button onClick={() => { Message.success('This is a message of success.') }}>Success</Button>
      <Button onClick={() => { Message.warn('This is a message of warning.') }}>Warn</Button>
      <Button onClick={() => { Message.error('This is a message of error.') }}>Error</Button>

      <Button onClick={() => { Message.close() }}>Close All</Button>
    </Fragment>
  )
}
