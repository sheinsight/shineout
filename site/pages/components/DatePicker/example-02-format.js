/**
 * cn - 格式化
 *    -- 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式
 * en - Format
 *    -- The format attribute defines the format of the return value
 */
import React, { Component } from 'react'
import { DatePicker, Input } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { format: 'yyyy-M-d HH:mm', value: new Date() }
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
