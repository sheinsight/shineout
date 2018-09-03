/**
 * cn - 联动
 *    -- 联动示例
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchUser } from 'doc/data/user'

const users = fetchUser(1000)
const temps = {}
users.forEach((u) => {
  temps[u.office] = true
})
const citys = Object.keys(temps)

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { city: '' }
  }

  handleCityChange = (city) => {
    this.setState({ city })
  }

  render() {
    const { city } = this.state
    const usersData = users.filter((u) => {
      if (!city) return u
      return u.office === city
    })

    return (
      <div>
        <Select
          data={citys}
          style={{ width: 140 }}
          keygen
          onChange={this.handleCityChange}
          placeholder="Select a city"
          value={city}
        />

        <Select
          data={usersData}
          style={{ width: 300 }}
          datum={{ format: 'id' }}
          keygen="id"
          placeholder="Select a user"
          renderItem={(user, i) => `${user.firstName} ${user.lastName} (${i + 1})`}
          renderResult={user => `${user.firstName} ${user.lastName}`}
        />
      </div>
    )
  }
}
