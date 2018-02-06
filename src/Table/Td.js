import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Td extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      data, rowSpan, colSpan, style, render, index, className,
    } = this.props
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
  rowSpan: undefined,
  style: {},
  render: undefined,
}

export default Td
