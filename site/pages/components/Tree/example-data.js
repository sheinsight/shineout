import React, { Component } from 'react'
import data, { allIds } from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { expand: false }
  }

  toggle = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({ expand: !this.state.expand })
  }

  render() {
    const { expand } = this.state
    return (
      <div>
        Current node count: &nbsp;
        <span>{allIds.length}</span>
        <span>. </span>
        <a onClick={this.toggle}>
          {expand ? 'Collapse' : 'Expand'}
          <span> Code</span>
        </a>
        <pre style={{ display: expand ? 'block' : 'none' }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }
}
