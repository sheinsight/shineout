/**
 * cn - 任意等分
 * en - Arbitrary
 */
import React, { Component } from 'react'
import { Grid, Input } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 12 }
  }

  handleCountChange = (count) => {
    this.setState({ count })
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <Input width={100} value={count} onChange={this.handleCountChange} />

        <div style={{ height: 20 }} />

        {
          Array.from({ length: count }).map((n, i) => (
            <div key={i} style={{ background: '#f2f2f2', marginBottom: 4 }}>
              <Grid width={(i + 1) / count} style={{ background: '#007bff', color: '#fff' }}>
                {i + 1}/{count}
              </Grid>
            </div>
          ))
        }
      </div>
    )
  }
}
