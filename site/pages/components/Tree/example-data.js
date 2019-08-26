import React, { Component } from 'react'
import data, { allIds } from 'doc/data/tree'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { expand: false }
  }

  toggle = () => {
    this.setState({ expand: !this.state.expand })
  }

  render() {
    const { expand } = this.state
    return (
      <div>
        Current node count: {allIds.length}.{' '}
        <a onClick={this.toggle}>
          {expand ? 'Collapse' : 'Expand'} Code
        </a>
        <pre style={{ display: expand ? 'block' : 'none' }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }
}
