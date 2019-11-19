/**
 * cn - 受控
 *    -- 组件受控
 * en - Controlled
 *    -- Component controlled
 */
import React, { Component } from 'react'
import { Transfer } from 'shineout'

const data = []

for (let i = 1; i < 20; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [1, 3, 5, 7, 9],
    }
  }

  onChange = v => {
    console.log(v)
    this.setState({ value: v })
  }

  render() {
    return (
      <Transfer
        data={data}
        value={this.state.value}
        onChange={this.onChange}
        format="id"
        renderItem="content"
        keygen="id"
        disabled={d => d.content.indexOf('1') > -1}
      />
    )
  }
}
