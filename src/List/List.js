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

    const { show, ...props } = this.props

    return (
      <div {...props} className={className} style={this.props.style} />
    )
  }
}

List.propTypes = {
  ...getProps(PropTypes),
  show: PropTypes.bool,
}

List.defaultProps = {
  ...defaultProps,
  show: false,
}

List.displayName = 'ShineoutList'

export default List
