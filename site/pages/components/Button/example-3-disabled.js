/**
 * cn - 不可用
 * en - Disabled
 */
import React, { Fragment } from 'react'
import { Button } from 'shineout'

export default function () {
  return (
    <Fragment>
      <Button disabled>Default</Button>
      <Button disabled type="primary">Primary</Button>
      <Button disabled type="secondary">Secondary</Button>
      <Button disabled type="success">Success</Button>
      <Button disabled type="info">Info</Button>
      <Button disabled type="warning">Warning</Button>
      <Button disabled type="danger">Danger</Button>
      <Button disabled type="link">Link</Button>
    </Fragment>
  )
}
