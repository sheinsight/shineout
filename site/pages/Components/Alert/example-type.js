import React, { Fragment } from 'react'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Fragment>
      <Alert type="success">Success Type.</Alert>
      <Alert type="info">Info Type.</Alert>
      <Alert type="warning">Warning Type.</Alert>
      {/* type 'error' === 'danger' */}
      <Alert type="error">Error Type.</Alert>
    </Fragment>
  )
}
