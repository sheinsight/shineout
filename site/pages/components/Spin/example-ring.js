/**
* cn - ring
* en - ring
*/
import React from 'react'
import { Spin } from 'shineout'

export default function () {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} type="ring" color="green" />
      <Spin type="ring" />
      <Spin size="54px" type="ring" color="#dc3545" />
    </div>
  )
}
