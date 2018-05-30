/**
 * cn - 点击事件
 * en - Click
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { active: '1' }
    this.defaultExpanded = ['1']
  }

  handleClick = (active) => {
    this.setState({ active })
  }

  renderItem = node => (
    <div
      onClick={this.handleClick.bind(this, node.id)}
      style={{ color: this.state.active === node.id ? 'red' : undefined }}
    >
      node {node.id}
    </div>
  )

  render() {
    return (
      <Tree
        data={data}
        keygen="id"
        defaultExpanded={this.defaultExpanded}
        // onClick={this.handleClick}
        onExpand={this.handleExpand}
        renderItem={this.renderItem}
      />
    )
  }
}

