/**
 * cn - 禁用
 *    -- disabled 为函数时，根据返回结果禁用节点，同时禁用子节点
 *    -- disabled 为 true 时，禁用全部节点
 * en - disabled
 *    -- When the disabled property is a function, disable the node and its child nodes according to the returned result.
 *    -- When the disabled property is true, disable all nodes.
 */

import React from 'react'
import { Cascader } from 'shineout'
import { cascader as data } from 'doc/data/tree'

const isDisabled = d => d.id === '1-0' || d.id === '2'

export default function() {
  return <Cascader data={data} keygen="id" disabled={isDisabled} mode={2} renderItem={n => `node ${n.text}`} />
}
