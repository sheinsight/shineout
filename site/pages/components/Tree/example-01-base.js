/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default function () {
  return (
    <Tree data={data} keygen="id" renderItem={n => `node ${n.id}`} />
  )
}
