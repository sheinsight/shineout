/**
 * cn - 格式化
 * en - Format
 */
import React, { Component } from 'react'
import { DatePicker, Input } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { format: 'YYYY-M-D H:m:s' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(format) {
    this.setState({ format })
  }

  render() {
    const { format } = this.state

    return (
      <div>
        format: <Input width={200} value={format} onChange={this.handleChange} />
        <DatePicker placeholder="format date" style={{ marginLeft: 12 }} format={format} />
      </div>
    )
  }
}
