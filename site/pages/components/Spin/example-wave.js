/**
 * cn - wave
 * en - wave
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="wave" color="green" />
      <Spin type="wave" />
      <Spin size="4rem" type="wave" color="#dc3545" />
    </div>
  )
}
