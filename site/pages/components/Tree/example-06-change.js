/**
 * cn - 可选择
 *    -- * Tree 放在 Form 组件内使用时，需要放在 Form.Field 组件内
 * en - onChange
 */
import React, { Component } from 'react'
import { Tree, Radio } from 'shineout'
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

const modeList = [
  { value: 0, text: 'mode=0 (full)' },
  { value: 1, text: 'mode=1 (half)' },
  { value: 2, text: 'mode=2 (child only)' },
  { value: 3, text: 'mode=3 (shallow)' },
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 0, value: [] }
  }

  handleChange = (value) => {
    this.setState({ value })
  }

  handleModeChange = (mode) => {
    this.setState({ mode, value: [] })
  }

  renderItem = node => `node ${node.id}`

  render() {
    const { mode, value } = this.state

    return (
      <div>
        <Radio.Group
          value={mode}
          datum={{ format: 'value' }}
          onChange={this.handleModeChange}
          data={modeList}
          renderItem="text"
        />

        <br />

        <Tree
          data={data}
          defaultExpanded={['1', '2']}
          keygen="id"
          mode={mode}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          value={value}
        />

        <div style={resultStyle}>
          Current select value:
          <pre style={{ background: '#f2f2f2' }}>
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}
