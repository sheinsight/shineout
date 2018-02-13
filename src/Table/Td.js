import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tableClass } from '../styles'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

class Td extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      data, rowSpan, colSpan, render, index, fixed, style,
    } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
      ),
    )

    return (
      <td style={style} className={className} rowSpan={rowSpan} colSpan={colSpan}>
        {
        render && typeof render === 'string'
          ? data[render]
          : render(data, index)
      }
      </td>
    )
  }
}

Td.propTypes = {
  colSpan: PropTypes.number,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  fixed: PropTypes.string,
  rowSpan: PropTypes.number,
  render: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  style: PropTypes.object,
}

Td.defaultProps = {
  className: undefined,
  colSpan: undefined,
  fixed: '',
  rowSpan: undefined,
  render: undefined,
  style: {},
}

export default Td
