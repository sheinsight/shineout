/**
* cn - chasing-dots
     -- name="chasing-dots"
* en - chasing-dots
     -- name="chasing-dots"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="chasing-dots" color="green" />
      <Spin name="chasing-dots" />
      <Spin size="54px" name="chasing-dots" color="#dc3545" />
    </div>
  )
}
