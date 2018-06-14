/**
 * cn - 格式化
 *    -- 可以修改 format 来定义返回值和传入值的格式
 * en - Format
 */
import React, { Component } from 'react'
import { DatePicker, Input } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { format: 'YYYY-M-d HH:mm', value: new Date() }
    this.handleFormatChange = this.handleChange.bind(this, 'format')
    this.handleValueChange = this.handleChange.bind(this, 'value')
  }

  handleChange(type, value) {
    this.setState({ [type]: value })
  }

  render() {
    const { format } = this.state

    return (
      <div>
        <DatePicker
          placeholder="format date"
          type="datetime"
          style={{ marginRight: 12 }}
          format={format}
          value={this.state.value}
          onChange={this.handleValueChange}
        />

        <Input width={200} value={format} onChange={this.handleFormatChange} />
      </div>
    )
  }
}
