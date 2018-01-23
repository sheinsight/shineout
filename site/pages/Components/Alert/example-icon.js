import React, { Fragment } from 'react'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Fragment>
      <Alert type="success" icon>Success Type.</Alert>
      <Alert type="info" icon>Info Type.</Alert>
      <Alert type="warning" icon>Warning Type.</Alert>
      <Alert type="danger" icon>Error Type.</Alert>

      <Alert icon iconSize={24}>
        <h3>Set iconSize</h3>
        iconSize=24
      </Alert>
    </Fragment>
  )
}
