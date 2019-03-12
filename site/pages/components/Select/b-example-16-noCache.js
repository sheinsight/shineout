/**
 * cn - 不使用缓存
 *    -- 设置 noCache 可以不启用缓存(此选项可能导致有性能消耗, 不建议使用, 但是你可以在特殊情况下使用它)
 * en - no cache
 *    -- Set noCahe property to disable the cache(this option may result in performance overhead and is not recommended, but you can use it in the special situations)
 */
import React, { Component } from 'react'
import { Select } from 'shineout'

const style = { width: 240, marginBottom: 12, display: 'block' }
const data1 = [
  {
    id: '1',
    title: 'name',
  },
]
const data2 = [
  {
    id: '1',
    title: 'age',
  },
]

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data1,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: data2 })
    }, 1000)
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <Select noCache data={data} format="id" keygen="id" value="1" style={style} renderItem="title" />
      </div>
    )
  }
}
