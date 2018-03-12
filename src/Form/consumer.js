import React, { PureComponent } from 'react'
import contextTypes from './contextTypes'

export default (keys, Origin) => class extends PureComponent {
  static contextTypes = contextTypes

  render() {
    const props = {}
    keys.forEach((k) => {
      const val = this.context[k]
      if (val !== undefined) props[k] = val
    })
    return <Origin {...this.props} {...props} />
  }
}

