import React from 'react'
import Sticky from 'shineout/Sticky'

export default function () {
  return (
    <Sticky top={200}>
      <div style={{ background: '#f2f2f2', border: 'solid 1px #ccc', padding: 20 }}>
        Some content.
        <br />
        <br />
        Sticky 200px to top.
      </div>
    </Sticky>
  )
}
