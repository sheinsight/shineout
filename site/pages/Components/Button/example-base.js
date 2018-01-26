import React, { Fragment } from 'react'
import Button from 'shineout/Button'

export default function () {
  return (
    <Fragment>
      <Button type="primary">Primary</Button>
      <Button>Secondary</Button>
      <Button type="success">Success</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </Fragment>
  )
}
