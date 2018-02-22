/**
 * cn - fading-circle
 * en - fading-circle
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="fading-circle" color="green" />
      <Spin type="fading-circle" />
      <Spin size="5rem" type="fading-circle" color="#dc3545" />
    </div>
  )
}
