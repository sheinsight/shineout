/**
* cn - pulse
     -- name="pulse"
* en - pulse
     -- name="pulse"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="pulse" color="green" />
      <Spin name="pulse" />
      <Spin size="54px" name="pulse" color="#dc3545" />
    </div>
  )
}
