import React from 'react'
import Sticky from 'shineout/Sticky'

export default function () {
  return (
    <Sticky bottom={0}>
      <div style={{ background: '#f2f2f2', border: 'solid 1px #ccc', padding: 20 }}>
        Sticky at bottom.
      </div>
    </Sticky>
  )
}
