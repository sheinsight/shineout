/**
 * cn -
 *    -- 示例：创建选项和 filter(服务端过滤) 配合使用
 * en -
 *    -- Example: Create options with filter(filter data from server)
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
        onCreate={text => ({ id: text, firstName: text, lastName: '' })}
      />
    )
  }
}
