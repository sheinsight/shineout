/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数。
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React, { Component } from 'react'
import immer from 'immer'
import { TreeSelect } from 'shineout'

const initData = ['0', '1', '2', '3', '4'].map(i => ({ id: i }))

let index = 0
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { data: initData, value: [] }
  }

  loader = key => {
    setTimeout(() => {
      this.setState(
        immer(draft => {
          const { data } = draft
          data[parseInt(key, 10)].children = Array(6)
            .fill(0)
            .map(() => ({ id: `-${index++}`, children: [] }))
        })
      )
    }, 500)
  }

  handleChange = value => this.setState({ value })

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <TreeSelect
        multiple
        loader={this.loader}
        value={this.state.value}
        onChange={this.handleChange}
        keygen="id"
        renderItem={this.renderItem}
        data={this.state.data}
      />
    )
  }
}
