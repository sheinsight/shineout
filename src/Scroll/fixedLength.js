import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Bar) {
  class FixedLength extends PureComponent {
    render() {
      const { length, scrollLength } = this.props
      let barLength = (length / scrollLength) * length
      if (barLength < 20) barLength = 20

      return (
        <Bar
          {...this.props}
          length={length}
          barLength={barLength}
        />
      )
    }
  }

  FixedLength.propTypes = {
    direction: PropTypes.string,
    length: PropTypes.number.isRequired,
    scrollLength: PropTypes.number.isRequired,
  }

  FixedLength.defaultProps = {
    direction: 'y',
  }

  return FixedLength
}
