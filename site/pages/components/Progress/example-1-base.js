/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Progress } from 'shineout'

export default function () {
  return (
    <div style={{ width: 400 }}>
      <Progress value={50} />
      <br />
      <Progress value={50}>50%</Progress>
    </div>
  )
}
