import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Origin) {
  return class extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {}
    }

    render() {
      return (
        <Origin />
      )
    }
  }
}
