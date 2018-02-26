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
      rowSpan, colSpan, content, fixed, style, firstFixed, lastFixed,
    } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
        firstFixed && 'fixed-first',
        lastFixed && 'fixed-last',
      ),
    )

    return (
      <td style={style} className={className} rowSpan={rowSpan} colSpan={colSpan}>
        {content}
      </td>
    )
  }
}

Td.propTypes = {
  colSpan: PropTypes.number,
  className: PropTypes.string,
  content: PropTypes.any,
  firstFixed: PropTypes.bool,
  fixed: PropTypes.string,
  lastFixed: PropTypes.bool,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
}

Td.defaultProps = {
  fixed: '',
  style: {},
}

export default Td
