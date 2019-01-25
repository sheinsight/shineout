/**
* cn - plane
     -- name="plane"
* en - plane
     -- name="plane"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="plane" color="green" />
      <Spin name="plane" />
      <Spin size="54px" name="plane" color="#dc3545" />
    </div>
  )
}
