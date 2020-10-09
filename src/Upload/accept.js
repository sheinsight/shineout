import React from 'react'
import PropTypes from 'prop-types'

export default Component =>
  class extends React.PureComponent {
    static propTypes = {
      accept: PropTypes.string,
      forceAccept: PropTypes.string,
    }

    render() {
      const { forceAccept, accept } = this.props
      return <Component {...this.props} accept={forceAccept || accept} forceAccept={!!forceAccept} />
    }
  }
