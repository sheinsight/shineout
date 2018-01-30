import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { listClass } from '../styles'

class List extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const className = classnames(
      listClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

List.propTypes = {
  ...getProps(),
  children: PropTypes.any,
  show: PropTypes.bool,
}

List.defaultProps = {
  ...defaultProps,
  show: false,
}

export default List
