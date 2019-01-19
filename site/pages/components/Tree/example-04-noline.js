/**
 * cn - 无连接线
 *    -- 设置 line 为 false，隐藏连接线
 * en - Line
 *    -- Set the line property to false to hid the connecting line.
 */
import React from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default function() {
  return <Tree data={data} defaultExpanded={['1', '2']} line={false} keygen="id" renderItem={n => `node ${n.id}`} />
}
