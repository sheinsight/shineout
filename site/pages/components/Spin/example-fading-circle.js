/**
* cn - fading-circle
* en - fading-circle
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} type="fading-circle" color="green" />
      <Spin type="fading-circle" />
      <Spin size="54px" type="fading-circle" color="#dc3545" />
    </div>
  )
}
