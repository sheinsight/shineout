import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Year extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      // current: props.year,
    }
  }

  handleChange(year) {
    this.props.onChange(year)
  }

  render() {
    return (
      <div />
    )
  }
}

Year.propTypes = {
  onChange: PropTypes.func.isRequired,
  // year: PropTypes.number,
}

export default Year
