/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React, { Component } from 'react'
import immer from 'immer'
import { Cascader } from 'shineout'

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map(i => ({ id: i }))
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { data: initData, value: [] }
  }

  loader = key => {
    const path = key.split(',')

    setTimeout(() => {
      this.setState(
        immer(draft => {
          let { data } = draft
          path.forEach((pid, i) => {
            data = data.find(d => d.id === pid)
            if (i < path.length - 1) data = data.children
          })
          data.children = [...createRange().map(i => ({ id: `${data.id}-${i}` }))]
        })
      )
    }, 500)
  }

  keyGenerator = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')

  handleChange = value => this.setState({ value })

  renderItem = node => `node ${node.id}`

  render() {
    return (
      <Cascader
        data={this.state.data}
        keygen={this.keyGenerator}
        loader={this.loader}
        renderItem={this.renderItem}
        onChange={this.handleChange}
        value={this.state.value}
      />
    )
  }
}
