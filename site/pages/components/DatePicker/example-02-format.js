/**
 * cn - 格式化
 *    -- 传入值可为 日期对象，时间戳，字符串，通过format 属性可以定义返回值的格式. <br />支持通过 formatResult 属性单独格式化值展示格式. <br /><br /> <b>注: 我们使用的格式化字符串(date-fns)和 moment 是不一致的, 如: <br /> <br /> moment: YYYY  => date-fns: yyyy <br /> moment: DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br /> moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH  </b><br /><br /> 详细的请参照 <a href="#heading-3-Format">Format<a>
 * en - Format
 *    -- The format attribute defines the format of the return value.  <br /><br /> <b>tip: The format string we used (date-fns) and moment.js are inconsistent, such as: <br /> <br /> moment: YYYY  => date-fns: yyyy <br /> moment: DD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br /> moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH  </b><br /><br /> Please refer to the details <a href="#heading-3-Format">Format<a>
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
