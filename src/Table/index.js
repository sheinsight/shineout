import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { tableClass } from '../styles'

class Table extends PureComponent {
  render() {
    const { style } = this.props
    const className = classnames(
      tableClass('_'),
      this.props.className,
    )

    return (
      <div className={className} style={style}>Table</div>
    )
  }
}

Table.propTypes = {
  ...getProps('size', 'type'),
}

Table.defaultProps = {
  ...defaultProps,
}

export default Table
