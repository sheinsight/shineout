import React from 'react'
import { Component } from '../component'

export default Origin =>
  class extends Component {
    render() {
      return <Origin {...this.props} />
    }
  }
