import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import contextTypes from './contextTypes'

export default (keys, Origin) => class extends PureComponent {
  static contextTypes = {
    ...contextTypes,
    onError: PropTypes.func,
  }

  static propTypes = {
    onError: PropTypes.func,
  }

  handleError(...args) {
    if (this.props.onError) this.props.onError(...args)
    if (this.context.onError) this.context.onError(...args)
  }

  render() {
    const props = {}
    keys.forEach((k) => {
      if (k === 'onError') {
        props.onError = this.handleError.bind(this)
        return
      }
      const val = this.context[k]
      if (val !== undefined) props[k] = val
    })

    return <Origin {...this.props} {...props} />
  }
}

