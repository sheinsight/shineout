/**
 * cn - plane
 * en - plane
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="plane" color="green" />
      <Spin type="plane" />
      <Spin size="5rem" type="plane" color="#dc3545" />
    </div>
  )
}
