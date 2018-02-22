/**
 * cn - scale-circle
 * en - scale-circle
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="scale-circle" color="green" />
      <Spin type="scale-circle" />
      <Spin size="5rem" type="scale-circle" color="#dc3545" />
    </div>
  )
}
