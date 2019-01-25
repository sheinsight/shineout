/**
* cn - fading-circle
     -- name="fading-circle"
* en - fading-circle
     -- name="fading-circle"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="fading-circle" color="green" />
      <Spin name="fading-circle" />
      <Spin size="54px" name="fading-circle" color="#dc3545" />
    </div>
  )
}
