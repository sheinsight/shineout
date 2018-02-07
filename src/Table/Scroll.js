import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default function (Component) {
  class Scroll extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {}
    }

    render() {
      const { className } = this.props

      return (
        <div className={className} >
          <Component {...this.props} />
        </div>
      )
    }
  }

  Scroll.propTypes = {
    className: PropTypes.string,
    itemHeight: PropTypes.number,
    showCount: PropTypes.number,
  }

  Scroll.defaultProps = {
    className: '',
    itemHeight: 40,
    showCount: 30,
  }

  return Scroll
}
