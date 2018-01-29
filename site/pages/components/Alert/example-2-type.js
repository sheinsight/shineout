/**
 * cn - 类型 type
 * en - type
 */
import React, { Fragment } from 'react'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Fragment>
      <Alert type="success">Success Type.</Alert>
      <Alert type="info">Info Type.</Alert>
      <Alert type="warning">Warning Type.</Alert>
      <Alert type="danger">Danger Type.</Alert>
    </Fragment>
  )
}
