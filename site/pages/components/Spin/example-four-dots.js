/**
* cn - four-dots
* en - four-dots
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={16} type="four-dots" color="green" />
      <Spin type="four-dots" />
      <Spin size="48px" type="four-dots" color="#dc3545" />
    </div>
  )
}
