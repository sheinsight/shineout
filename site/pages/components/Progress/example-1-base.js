/**
 * cn - 基本用法
 *    -- 基础的进度条
 * en - Base
 *    -- Basic progress bar
 */
import React from 'react'
import { Progress } from 'shineout'

export default function() {
  return (
    <div style={{ width: 400 }}>
      <Progress value={50} />
      <br />
      <Progress value={50}>50%</Progress>
    </div>
  )
}
