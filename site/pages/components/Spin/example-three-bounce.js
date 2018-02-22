/**
 * cn - three-bounce
 * en - three-bounce
 */
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  return (
    <div style={{ display: 'flex' }}>
      <Spin size={20} type="three-bounce" color="green" />
      <Spin type="three-bounce" />
      <Spin size="5rem" type="three-bounce" color="#dc3545" />
    </div>
  )
}
