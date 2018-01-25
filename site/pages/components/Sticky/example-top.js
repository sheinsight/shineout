import React from 'react'
import Sticky from 'shineout/Sticky'
import Alert from 'shineout/Alert'

export default function () {
  return (
    <Sticky top={20}>
      <Alert onClose>
        <h3>Some content.</h3>
        Sticky 20px to top.
      </Alert>
    </Sticky>
  )
}
