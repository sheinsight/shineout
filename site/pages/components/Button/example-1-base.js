/**
 * cn - 基础
 * en - Base
 */
import React, { Fragment } from 'react'
import Button from 'shineout/Button'

export default function () {
  return (
    <Fragment>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="success">Success</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
    </Fragment>
  )
}
