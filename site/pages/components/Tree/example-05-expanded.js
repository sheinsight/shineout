/**
 * cn - 控制展开
 *    -- 受控的展开（此示例数据量太大，第一次全部展开会比较慢）
 * en - Expanded
 *    -- Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)
 */
import React, { Component } from 'react'
import { Button, Tree } from 'shineout'
import data, { allIds } from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: ['1'] }

    this.collapseAll = this.handleExpand.bind(this, [])
    this.expandAll = this.handleExpand.bind(this, [...allIds])
  }

  handleExpand = expanded => {
    this.setState({ expanded })
  }

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <div>
        <div style={{ marginBottom: 12 }}>
          <Button onClick={this.expandAll}>Expand all</Button>
          <Button onClick={this.collapseAll}>Collapse all</Button>
        </div>
        <Tree
          data={data}
          keygen="id"
          line={false}
          expanded={this.state.expanded}
          onExpand={this.handleExpand}
          renderItem={this.renderItem}
        />
      </div>
    )
  }
}
