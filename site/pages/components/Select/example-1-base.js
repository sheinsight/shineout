/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Select style={{ width: 240 }} data={data} placeholder="Select" />
  )
}
