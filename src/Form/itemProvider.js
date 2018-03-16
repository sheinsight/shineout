import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'

export default Origin => class extends PureComponent {
  static childContextTypes = {
    onError: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = { errors: {} }
    this.handleError = this.handleError.bind(this)
  }

  getChildContext() {
    return {
      onError: this.handleError,
    }
  }

  handleError(name, error) {
    this.setState(immer((state) => {
      if (!error) {
        delete state.errors[name]
      } else {
        state.errors[name] = error
      }
    }))
  }

  render() {
    return <Origin {...this.props} formItemErrors={this.state.errors} />
  }
}

