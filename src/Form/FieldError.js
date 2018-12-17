import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formClass } from '../styles'

class FieldError extends PureComponent {
  render() {
    let { error } = this.props

    // eslint-disable-next-line
    if (Array.isArray(error)) error = error[0]

    if (!(error instanceof Error)) return null

    return (
      <div className={formClass('error')}>{error.message}</div>
    )
  }
}

FieldError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

export default FieldError
