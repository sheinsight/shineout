/**
 * cn - 复杂数据
 *    -- 复杂的数据可以使用 format 处理 value
 * en - Complex data
 *    -- Complex data can use format to process value.
 */
import React, { Component } from 'react'
import { Tree } from 'shineout'
import data from 'doc/data/tree'

const resultStyle = {
  position: 'absolute',
  right: 30,
  top: 100,
  bottom: 40,
  width: 240,
  overflow: 'auto',
  background: '#f2f2f2',
  padding: 10,
  zIndex: 100,
}

export default class extends Component {
  constructor(props) {
    super(props)

    const value = []
    // getValue(data, value)

    this.state = { mode: 1, value }
  }

  handleChange = value => {
    this.setState({ value })
  }

  renderItem = node => `node ${node.id}`

  render() {
    const { value } = this.state

    return (
      <div>
        <Tree
          data={data}
          defaultExpanded={['0', '2']}
          format={d => `node-${d.id}`}
          keygen="id"
          mode={1}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          value={value}
        />

        <div style={resultStyle}>
          Current select value:
          <pre style={{ background: '#f2f2f2' }}>{JSON.stringify(value, null, 2)}</pre>
        </div>
      </div>
    )
  }
}
