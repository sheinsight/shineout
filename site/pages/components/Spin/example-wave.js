/**
* cn - wave
* en - wave
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={16} type="wave" color="green" />
      <Spin type="wave" />
      <Spin size="48px" type="wave" color="#dc3545" />
    </div>
  )
}
