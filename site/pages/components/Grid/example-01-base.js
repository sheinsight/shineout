/**
 * cn - 任意等分
 * en - Arbitrary
 */
import React, { Component } from 'react'
import { Grid, Slider } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 5 }
  }

  handleCountChange = (count) => {
    this.setState({ count })
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <Slider
          formatValue={false}
          scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}
          step={0}
          value={count}
          onChange={this.handleCountChange}
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
