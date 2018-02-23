/**
* cn - plane
* en - plane
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={16} type="plane" color="green" />
      <Spin type="plane" />
      <Spin size="48px" type="plane" color="#dc3545" />
    </div>
  )
}
