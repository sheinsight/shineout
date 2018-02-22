/**
 * cn - pulse
 * en - pulse
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="pulse" color="green" />
      <Spin type="pulse" />
      <Spin size="5rem" type="pulse" color="#dc3545" />
    </div>
  )
}
