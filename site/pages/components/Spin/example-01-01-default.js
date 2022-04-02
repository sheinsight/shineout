/**
* cn - default
     -- name="default"
* en - default
     -- name="default"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} color="green" />
      <Spin />
      <Spin size="54px" color="#dc3545" />
    </div>
  )
}
