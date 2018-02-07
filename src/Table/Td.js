import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Td extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      data, rowSpan, colSpan, render, index, className, fixed, scrollX,
    } = this.props

    const style = Object.assign({}, this.props.style)
    if (fixed === 'left' && scrollX) {
      style.transform = `translateX(${scrollX}px)`
    }

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
  scrollX: PropTypes.number,
  style: PropTypes.object,
}

Td.defaultProps = {
  className: undefined,
  colSpan: undefined,
  fixed: '',
  rowSpan: undefined,
  render: undefined,
  scrollX: undefined,
  style: {},
}

export default Td
