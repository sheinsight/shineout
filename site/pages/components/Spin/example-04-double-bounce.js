/**
* cn - double-bounce
     -- name="double-bounce"
* en - double-bounce
     -- name="double-bounce"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="double-bounce" color="green" />
      <Spin name="double-bounce" />
      <Spin size="54px" name="double-bounce" color="#dc3545" />
    </div>
  )
}
