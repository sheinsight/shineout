/**
* cn - cube-grid
* en - cube-grid
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} type="cube-grid" color="green" />
      <Spin type="cube-grid" />
      <Spin size="54px" type="cube-grid" color="#dc3545" />
    </div>
  )
}
