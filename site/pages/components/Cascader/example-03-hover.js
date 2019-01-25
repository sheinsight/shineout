/**
 * cn - 移入展开
 *    -- 设置 expandTrigger 为 'hover' 或 'hover-only', 可以在鼠标移入节点时展开，默认为 'click'
 *    -- 如果值为 'hover-only'，父节点只能 hover 触发展开, 只有子节点可以点击选择值
 * en - Hover
 *    -- Set expandTrigger to 'hover' or 'hover-only', expand the node when mouse hover, default value is 'click'.
 */

import React from 'react'
import { Cascader } from 'shineout'
import { cascader as data } from 'doc/data/tree'

export default function() {
  return (
    <Cascader
      data={data}
      keygen="id"
      expandTrigger="hover-only"
      renderItem={n => `node ${n.text}`}
      renderResult={n => (n.children && n.children.length > 0 ? '' : n.text)}
      style={{ width: 300 }}
    />
  )
}
