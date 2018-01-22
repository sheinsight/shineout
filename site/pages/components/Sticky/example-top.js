import React from 'react'
import Sticky from 'shineout/Sticky'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Sticky top={200}>
      <Alert>
        <h4>Some content.</h4>
        Sticky 200px to top.
      </Alert>
    </Sticky>
  )
}
