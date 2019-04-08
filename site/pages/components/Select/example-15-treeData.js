/**
 * cn - 树形选择
 *    -- 通过设置 treeData 来实现树形选择。
 * en - Tree Select
 *    -- Set treeData to select with tree.
 */
import React from 'react'
import { Select } from 'shineout'
import data from 'doc/data/tree'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      single: '',
      multiple: [],
    }

    this.handleSingleChange = this.handleChange.bind(this, true)
    this.handleMultipleChange = this.handleChange.bind(this, false)
  }

  handleChange = (single, v) => {
    if (single) this.setState({ single: v })
    else this.setState({ multiple: v })
  }

  render() {
    return (
      <div>
        <Select
          onChange={this.handleSingleChange}
          value={this.state.single}
          disabled={v => v.text.startsWith('1')}
          format="id"
          keygen="id"
          renderItem={v => `node ${v.text}`}
          style={{ width: 250, marginBottom: 20 }}
          treeData={data}
        />
        <br />

        <Select
          clearable
          multiple
          onChange={this.handleMultipleChange}
          value={this.state.multiple}
          disabled={v => v.text.startsWith('1')}
          format="id"
          keygen="id"
          renderItem={v => `node ${v.text}`}
          style={{ width: 250 }}
          treeData={data}
        />
      </div>
    )
  }
}
