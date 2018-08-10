/**
 * cn - 基本用法
 *    -- 基础的 Tree 用法
 * en - Base
 *   -- Basic usage of Tree
 */
import React from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default function () {
  return (
    <Tree
      data={data}
      keygen="id"
      defaultExpanded={['2']}
      renderItem={n => `node ${n.text}`}
    />
  )
}
