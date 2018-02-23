/**
* cn - chasing-dots
* en - chasing-dots
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} type="chasing-dots" color="green" />
      <Spin type="chasing-dots" />
      <Spin size="54px" type="chasing-dots" color="#dc3545" />
    </div>
  )
}
