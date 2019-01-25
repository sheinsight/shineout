/**
* cn - three-bounce
     -- name="three-bounce"
* en - three-bounce
     -- name="three-bounce"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="three-bounce" color="green" />
      <Spin name="three-bounce" />
      <Spin size="54px" name="three-bounce" color="#dc3545" />
    </div>
  )
}
