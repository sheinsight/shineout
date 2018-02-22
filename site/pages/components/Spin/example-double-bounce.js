/**
 * cn - double-bounce
 * en - double-bounce
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="double-bounce" color="green" />
      <Spin type="double-bounce" />
      <Spin size="5rem" type="double-bounce" color="#dc3545" />
    </div>
  )
}
