import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Thead extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { columns } = this.props
    return (
      <thead>
        <tr>
          {
            columns.map(col => (
              <th key={col.key}>{col.title}</th>
            ))
          }
        </tr>
      </thead>
    )
  }
}

Thead.propTypes = {
  columns: PropTypes.array.isRequired,
}

export default Thead
