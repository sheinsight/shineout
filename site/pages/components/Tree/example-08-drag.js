/**
 * cn - 拖动
 *    -- 设置 onDrop 属性可以拖动节点
 * en - Drag
 *    -- Set the onDrop property to drag nodes.
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import tree from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { data: tree }
    this.defaultExpanded = ['1']
  }

  handleDrop = (data, key, targetKey, position) => {
    console.log(data, key, targetKey, position)
    this.setState({ data })
  }

  renderItem = node => (
    <div>
      <span>node </span>
      <span id={`node-id-${node.id}`}>{node.text}</span>
    </div>
  )

  render() {
    return (
      <Tree
        data={this.state.data}
        keygen="id"
        defaultExpanded={this.defaultExpanded}
        onDrop={this.handleDrop}
        renderItem={this.renderItem}
      />
    )
  }
}
