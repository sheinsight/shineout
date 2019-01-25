/**
 * cn - 禁用
 *    -- disabled 为函数时，根据返回结果禁用节点，同时禁用子节点
 *    -- disabled 为 true 时，禁用全部节点
 * en - disabled
 *    -- When the disabled property is a function, disable the node and its child nodes according to the returned result.
 *    -- When the disabled property is true, disable all nodes.
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default class extends Component {
  handleChange = value => {
    console.log(value)
  }

  isDisabled = node => node.id === '1-0'

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <Tree
        data={data}
        defaultExpanded={['1', '2']}
        disabled={this.isDisabled}
        keygen="id"
        onChange={this.handleChange}
        renderItem={this.renderItem}
      />
    )
  }
}
