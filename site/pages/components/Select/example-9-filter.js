/**
 * cn - 筛选数据 - 服务端
 *    -- 服务端筛选数据时，filter 函数不要返回
 * en - filter
 */
import React, { Component } from 'react'
import { Select } from 'shineout'
import { fetch } from 'doc/data/user'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }

  handleFilter = (text) => {
    this.setState({ loading: true })
    fetch.get('user', { username: text }).then((res) => {
      this.setState({ loading: false, data: res.data })
    })
  }

  render() {
    return (
      <Select
        loading={this.state.loading}
        style={{ width: 240 }}
        data={this.state.data}
        placeholder="Select user"
        onChange={d => console.log(d)}
        filter={this.handleFilter}
        datum={{ format: 'id' }}
        renderItem={user => `${user.firstName} ${user.lastName}`}
      />
    )
  }
}
