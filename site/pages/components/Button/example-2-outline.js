/**
 * cn - 透明背景 outline
 * en - Outline
 */
import React, { Fragment } from 'react'
import { Button } from 'shineout'

export default function () {
  return (
    <Fragment>
      <Button outline type="primary">Primary</Button>
      <Button outline type="secondary">Secondary</Button>
      <Button outline type="success">Success</Button>
      <Button outline type="info">Info</Button>
      <Button outline type="warning">Warning</Button>
      <Button outline type="danger">Danger</Button>
    </Fragment>
  )
}
