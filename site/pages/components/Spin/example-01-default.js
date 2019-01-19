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
      <Spin size={18} name="default" color="green" />
      <Spin name="default" />
      <Spin size="54px" name="default" color="#dc3545" />
    </div>
  )
}
