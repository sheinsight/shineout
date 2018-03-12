import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import contextTypes from './contextTypes'

export default Origin => class extends PureComponent {
  static childContextTypes = contextTypes

  static propTypes = {
    ...contextTypes,
    datum: PropTypes.object,
  }

  getChildContext() {
    const { datum, labelWidth, disabled } = this.props
    return {
      formDatum: datum,
      disabled,
      labelWidth,
    }
  }

  render() {
    return <Origin {...this.props} />
  }
}
