/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 *    -- compressed属性为true时，将选中值合并，只在多选模式下有效
 * en - Multiple
 *    -- Set the multiple property to true, it is multi-selection.
 *    -- Set the compressed property to true to merge selected values, valid only in multiselect mode.
 */
import React, { Component } from 'react'
import { Select } from 'shineout'

const data = [
  { id: 'red' },
  { id: 'orange' },
  { id: 'yellow' },
  { id: 'green' },
  { id: 'cyan' },
  { id: 'blue' },
  { id: 'violet' },
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 'pink' }
  }

  handleChange = (value, d, c) => {
    console.log(value, d, c)
    this.setState({ value })
  }

  render() {
    return (
      <div>
        <Select
          style={{ width: 300, marginBottom: 15 }}
          data={data}
          keygen="id"
          multiple
          placeholder="Multiple select"
          onChange={this.handleChange}
          value={this.state.value}
          renderItem="id"
          format="id"
        />
        <br />
        <Select
          compressed
          style={{ width: 300 }}
          data={data}
          keygen="id"
          multiple
          placeholder="Multiple select Compressed"
          renderItem="id"
          format="id"
        />
      </div>
    )
  }
}
