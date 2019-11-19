/**
 * cn - 受控选中
 *    -- 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中
 *    -- <b>注: 勾选的值均使用的是 keygen 的结果</b>
 * en - Controlled selected
 *    -- Can control which elements are selected by selectedKeys and onSelectChange
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
      selectedKeys: [1, 2, 3, 4],
    }
  }

  selectedChange = (sourceKeys, targetKeys) => {
    this.setState({ selectedKeys: [...sourceKeys, ...targetKeys] })
  }

  change = v => {
    console.log(v)
    this.setState({ value: v })
  }

  render() {
    const { selectedKeys, value } = this.state
    return (
      <Transfer
        data={data}
        selectedKeys={selectedKeys}
        onSelectChange={this.selectChange}
        value={value}
        onChange={this.change}
        format="id"
        renderItem="content"
        keygen="id"
      />
    )
  }
}
