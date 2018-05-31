/**
 * cn - 可选择
 * en - onChange
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = (value) => {
    console.log(value)
  }

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <div>
        <Tree
          data={data}
          defaultExpanded={['1', '2']}
          keygen="id"
          onChange={this.handleChange}
          renderItem={this.renderItem}
        />
      </div>
    )
  }
}
