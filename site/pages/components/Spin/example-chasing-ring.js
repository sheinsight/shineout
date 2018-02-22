/**
 * cn - chasing-ring
 * en - chasing-ring
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="chasing-ring" color="green" />
      <Spin type="chasing-ring" />
      <Spin size="5rem" type="chasing-ring" color="#dc3545" />
    </div>
  )
}
