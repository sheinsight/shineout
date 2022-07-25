/**
 * cn - 筛选数据 - 服务端
 *    -- onFilter 函数不返回结果时，从服务端筛选数据或自行处理
 * en - Filter - server
 *    -- When the onFilter property don't return a function, you can filter data from server or filter by yourself.
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

  componentDidMount() {
    this.handleFilter('')
  }

  handleFilter = text => {
    this.setState({ loading: true })
    fetch.get('user', { username: text }).then(res => {
      this.setState({ loading: false, data: res.data })
    })
  }

  render() {
    return (
      <Select
        loading={this.state.loading}
        keygen="id"
        style={{ width: 240 }}
        data={this.state.data}
        placeholder="Select user"
        onFilter={this.handleFilter}
        datum={{ format: 'id' }}
        renderItem={user => `${user.firstName} ${user.lastName}`}
      />
    )
  }
}
