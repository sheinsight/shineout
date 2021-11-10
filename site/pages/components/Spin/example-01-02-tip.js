/**
* cn - tip
     -- 自定义提示文案
* en - tip
     -- custom tip
*/
import React from 'react'
import { Spin } from 'shineout'

export default function() {
  const style = { display: 'flex' }
  return (
    <div style={style}>
      <Spin size={18} color="green" tip="Loading..." />
      <Spin size="54px" color="#dc3545" tip={<span style={{ fontSize: 20 }}>正在全力加载...</span>} />
    </div>
  )
}
