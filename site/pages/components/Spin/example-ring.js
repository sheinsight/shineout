/**
 * cn - ring
 * en - ring
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="ring" color="green" />
      <Spin type="ring" />
      <Spin size="5rem" type="ring" color="#dc3545" />
    </div>
  )
}
