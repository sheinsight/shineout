/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 * en - Multiple
 *    -- Set the multiple property to true, it is multi-selection.
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
    )
  }
}
