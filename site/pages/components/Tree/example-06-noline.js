/**
 * cn - 无连接线
 * en - Line
 */
import React from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default function () {
  return (
    <Tree
      data={data}
      defaultExpanded={['1', '2']}
      line={false}
      keygen="id"
      renderItem={n => `node ${n.id}`}
    />
  )
}
