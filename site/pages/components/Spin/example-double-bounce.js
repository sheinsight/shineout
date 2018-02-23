/**
* cn - double-bounce
* en - double-bounce
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={16} type="double-bounce" color="green" />
      <Spin type="double-bounce" />
      <Spin size="48px" type="double-bounce" color="#dc3545" />
    </div>
  )
}
