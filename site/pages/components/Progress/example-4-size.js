/**
 * cn - 大小
 * en - Size
 */
import React from 'react'
import { Progress } from 'shineout'

export default function () {
  return (
    <div>
      <Progress style={{ width: 120 }} strokeWidth={3} value={30} />

      <br />

      <Progress shape="circle" size={50} strokeWidth={6} style={{ marginRight: 20 }} value={70} />

      <Progress shape="circle" type="warning" style={{ marginRight: 20, width: 70, height: 70 }} value={70}>70%</Progress>

      <Progress shape="circle" type="success" value={100}>Success</Progress>
    </div>
  )
}
