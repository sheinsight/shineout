/**
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
        multiple
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
