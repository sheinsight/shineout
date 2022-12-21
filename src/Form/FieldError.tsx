import React, { PureComponent } from 'react'
import { formClass } from './styles'
import { FieldErrorProps } from './Props'

class FieldError extends PureComponent<FieldErrorProps> {
  render() {
    let { error } = this.props

    // eslint-disable-next-line
    if (Array.isArray(error)) error = error[0]

    if (!(error instanceof Error)) return null

    return <div className={formClass('error')}>{error.message}</div>
  }
}

export default FieldError
