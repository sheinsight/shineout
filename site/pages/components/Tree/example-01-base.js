/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

console.log(JSON.stringify(data, null, 2))

export default function () {
  return (
    <Tree />
  )
}
