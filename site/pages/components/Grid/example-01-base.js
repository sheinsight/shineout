/**
 * cn - 任意等分
 * en - Arbitrary
 */
import React, { Component } from 'react'
import { Grid, Select } from 'shineout'

const range = Array.from({ length: 100 }).map((n, i) => i + 1)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 7 }
  }

  handleCountChange = (count) => {
    this.setState({ count })
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <Select
          keygen={d => d}
          width={100}
          value={count}
          onChange={this.handleCountChange}
          data={range}
        />

        <div style={{ height: 20 }} />

        {
          Array.from({ length: count }).map((n, i) => (
            <div key={i} style={{ background: '#f2f2f2', marginBottom: 4 }}>
              <Grid width={(i + 1) / count} style={{ background: '#ccc' }}>
                {i + 1}/{count}
              </Grid>
            </div>
          ))
        }
      </div>
    )
  }
}
