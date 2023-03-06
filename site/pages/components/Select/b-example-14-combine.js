/**
 * cn - 联动
 *    -- 联动示例
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchUser } from 'doc/data/user'

const users = fetchUser(100).map(u => `${u.firstName} ${u.lastName} `)
const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'brown', 'puple']

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { type: 'color' }
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  render() {
    const { type } = this.state
    const data = type === 'user' ? users : colors

    return (
      <div>
        <Select data={['color', 'user']} style={{ width: 140 }} keygen onChange={this.handleTypeChange} value={type} />

        <Select data={data} style={{ width: 300 }} keygen />
      </div>
    )
  }
}
