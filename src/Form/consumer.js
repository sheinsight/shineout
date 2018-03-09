import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static contextTypes = {
    formDatum: PropTypes.object,
  }

  render() {
    return <Origin {...this.props} formDatum={this.context.formDatum} />
  }
}

