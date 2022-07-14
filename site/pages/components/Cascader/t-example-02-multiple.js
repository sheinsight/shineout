/**
 * cn - 多选
 *    -- 设置 mode 属性，使组件变为多选，mode 可选值如下
 *    -- 0: 只返回完全选中的节点，包含父节点
 *    -- 1: 返回全部选中的节点和半选中的父节点
 *    -- 2: 只返回选中的子节点
 *    -- 3: 如果父节点选中，只返回父节点
 * en - Multiple
 *   -- Set the mode property change the component to multiple select
 *    -- 0: Return only the fully selected node, including the parent node.
 *    -- 1: Return the fully selected nodes and semi-selected parent nodes.
 *    -- 2: Return only the selected child node.
 *    -- 3: Return only the parent node, if the parent node is selected.
 */

import React from 'react'
import { Cascader, Radio } from 'shineout'
import { cascader as data } from 'doc/data/tree'

const modeList = [
  { value: 0, text: 'mode=0 (full)' },
  { value: 1, text: 'mode=1 (half)' },
  { value: 2, text: 'mode=2 (child only)' },
  { value: 3, text: 'mode=3 (shallow)' },
]

function getValue(list, value) {
  const [node] = list
  if (!node) return
  value.push(node.id)
  if (node.children) getValue(node.children, value)
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    const value = []
    getValue(data, value)

    this.state = { mode: 1, value }
  }

  handleChange = value => {
    this.setState({ value })
  }

  handleModeChange = mode => {
    this.setState({ mode, value: [] })
  }

  renderItem = node => `node ${node.id}`

  render() {
    const { mode, value } = this.state

    return (
      <div>
        <Radio.Group
          keygen="value"
          value={mode}
          format="value"
          onChange={this.handleModeChange}
          data={modeList}
          renderItem="text"
        />

        <br />

        <Cascader
          data={data}
          keygen="id"
          mode={mode}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          value={value}
        />
      </div>
    )
  }
}
