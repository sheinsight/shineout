/**
 * cn - 禁用
 * en - disabled
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default class extends Component {
  handleChange = (value) => {
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
