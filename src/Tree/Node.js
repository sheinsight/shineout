import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Node extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div />
    )
  }
}

Node.propTypes = {
  data: PropTypes.object,
}

export default Node
