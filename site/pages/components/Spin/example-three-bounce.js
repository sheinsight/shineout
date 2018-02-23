/**
* cn - three-bounce
* en - three-bounce
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={16} type="three-bounce" color="green" />
      <Spin type="three-bounce" />
      <Spin size="48px" type="three-bounce" color="#dc3545" />
    </div>
  )
}
