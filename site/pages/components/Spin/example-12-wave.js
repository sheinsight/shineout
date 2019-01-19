/**
* cn - wave
     -- name="wave"
* en - wave
     -- name="wave"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="wave" color="green" />
      <Spin name="wave" />
      <Spin size="54px" name="wave" color="#dc3545" />
    </div>
  )
}
