/**
 * cn - cube-grid
 * en - cube-grid
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="cube-grid" color="green" />
      <Spin type="cube-grid" />
      <Spin size="5rem" type="cube-grid" color="#dc3545" />
    </div>
  )
}
