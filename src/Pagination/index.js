import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { paginationClass } from '../styles'

class Pagination extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(
      paginationClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>Pagination</div>
    )
  }
}

Pagination.propTypes = {
  ...getProps('size', 'type'),
  current: PropTypes.number,
  onChange: PropTypes.func,
  pageSize: PropTypes.number,
  total: PropTypes.number,
}

Pagination.defaultProps = {
  ...defaultProps,
  current: 1,
  pageSize: 10,
  total: 0,
}

export default Pagination
