/**
* cn - cube-grid
     -- name="cube-grid"
* en - cube-grid
     -- name="cube-grid"
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} name="cube-grid" color="green" />
      <Spin name="cube-grid" />
      <Spin size="54px" name="cube-grid" color="#dc3545" />
    </div>
  )
}
