/**
 * cn - chasing-ring \n 因为是用叠加元素实现的，所以type=chasing-ring的时候不要使用rgba半透明色
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
