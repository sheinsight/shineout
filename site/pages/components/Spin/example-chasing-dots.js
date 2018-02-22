/**
 * cn - chasing-dots
 * en - chasing-dots
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="chasing-dots" color="green" />
      <Spin type="chasing-dots" />
      <Spin size="5rem" type="chasing-dots" color="#dc3545" />
    </div>
  )
}
