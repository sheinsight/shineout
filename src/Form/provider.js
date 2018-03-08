import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static childContextTypes = {
    formDatum: PropTypes.object,
  }

  static propTypes = {
    datum: PropTypes.object,
  }

  getChildContext() {
    const { datum } = this.props
    return { formDatum: datum }
  }

  render() {
    return <Origin {...this.props} />
  }
}
