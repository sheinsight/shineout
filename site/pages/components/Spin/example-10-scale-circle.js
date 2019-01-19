/**
* cn - scale-circle
     -- name="scale-circle"
* en - scale-circle
     -- name="scale-circle"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="scale-circle" color="green" />
      <Spin name="scale-circle" />
      <Spin size="54px" name="scale-circle" color="#dc3545" />
    </div>
  )
}
