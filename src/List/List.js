import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { listClass } from '../styles'

// Use Component cause stateless Element can't use ref
// eslint-disable-next-line
class List extends Component {
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
