/**
 * cn -
 *    -- 示例：服务端过滤多选
 * en -
 *    -- Example: Server-side filters multiple selection.
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
    if (text === undefined) return
    this.setState({ loading: true })
    fetch.get('user', { username: text }).then(res => {
      this.setState({ loading: false, data: res.data })
    })
  }

  render() {
    return (
      <Select
        loading={this.state.loading}
        multiple
        keygen="id"
        data={this.state.data}
        placeholder="Select user"
        onFilter={this.handleFilter}
        datum={{ format: 'id' }}
        renderItem={user => `${user.firstName} ${user.lastName}`}
      />
    )
  }
}
