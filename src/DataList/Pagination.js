import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import pagable from '../hoc/pagable'

export default function(Origin) {
  return class extends PureComponent {
    static propTypes = {
      pagination: PropTypes.object,
    }

    render() {
      const { pagination } = this.props
      const Render = pagination ? pagable(Origin) : Origin
      return <Render {...this.props} />
    }
  }
}
