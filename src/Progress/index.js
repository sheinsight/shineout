import React from 'react'
import PropTypes from 'prop-types'
import Line from './Line'
import Circle from './Circle'

function Progress(props) {
  switch (props.shape) {
    case 'circle':
      return <Circle {...props} />
    default:
      return <Line {...props} />
  }
}

Progress.propTypes = {
  shape: PropTypes.oneOf(['line', 'circle']),
}

Progress.defaultProps = {
  shape: 'line',
}

Progress.displayName = 'ShineoutProgress'

export default Progress
