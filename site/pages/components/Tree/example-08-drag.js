/**
 * cn - 拖动
 * en - Drag
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

  handleDrop = (data, id, targetId, position) => {
    console.log(data, id, targetId, position)
    this.setState({ data })
  }

  renderItem = node => `node ${node.text}`

  render() {
    return (
      <Tree
        data={this.state.data}
        keygen="id"
        defaultExpanded={this.defaultExpanded}
        onDrop={this.handleDrop}
        onExpand={this.handleExpand}
        renderItem={this.renderItem}
      />
    )
  }
}

