/**
 * cn - 移入展开
 *    -- 设置 expandTrigger 为 'hover', 可以在鼠标移入节点时展开，默认为 'click'
 * en - Hover
 *    -- Set expandTrigger to 'hover', expand the node when mouse hover, default value is 'click'.
 */

import React from 'react'
import { Cascader } from 'shineout'
import { cascader as data } from 'doc/data/tree'

export default function () {
  return (
    <Cascader
      data={data}
      keygen="id"
      expandTrigger="hover"
      renderItem={n => `node ${n.text}`}
    />
  )
}
