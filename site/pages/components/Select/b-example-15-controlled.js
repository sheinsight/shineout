/**
 * cn - 基本用法
 *    -- Select 没有单独的 Option 选项，通过数据来渲染。
 * en - Base
 *    -- Select generate group of options from data.
 */
import React from 'react'
import { Button, Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  handleChange = value => {
    // if (data.indexOf(value) < 0 && !(/\d+/.test(value))) value = ''
    this.setState({ value })
  }

  render() {
    console.log(this.state.value)

    return (
      <div>
        <Button onClick={() => this.setState({ value: undefined })}>Clear</Button>
        <Select
          keygen
          // onFilter={text => d => d.indexOf(text) >= 0}
          style={{ width: 240 }}
          data={data}
          value={this.state.value}
          onChange={this.handleChange}
          multiple
          separator=","
        />
      </div>
    )
  }
}
