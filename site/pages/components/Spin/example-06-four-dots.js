/**
* cn - four-dots
     -- name="four-dots"
* en - four-dots
     -- name="four-dots"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="four-dots" color="green" />
      <Spin name="four-dots" />
      <Spin size="54px" name="four-dots" color="#dc3545" />
    </div>
  )
}
