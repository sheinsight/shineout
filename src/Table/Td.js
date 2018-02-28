import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tableClass } from '../styles'
import Checkbox from './Checkbox'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

/*
    <Checkbox
            onChange={this.handleRowSelect}
            checked={checkValue(data)}
            data={data}
            index={index}
            addValue={addValue}
            removeValue={removeValue}
          />
*/

class Td extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  renderCheckbox() {
    const {
      index, data, addValue, removeValue, checkValue,
    } = this.props
    return (
      <Checkbox
        data={data}
        index={index}
        addValue={addValue}
        checkValue={checkValue}
        removeValue={removeValue}
      />
    )
  }

  render() {
    const {
      rowSpan, colSpan, content, fixed, style, firstFixed, lastFixed, type,
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
        { type === 'checkbox' ? this.renderCheckbox() : content }
      </td>
    )
  }
}

Td.propTypes = {
  addValue: PropTypes.func,
  checkValue: PropTypes.func,
  data: PropTypes.object,
  removeValue: PropTypes.func,
  colSpan: PropTypes.number,
  className: PropTypes.string,
  content: PropTypes.any,
  firstFixed: PropTypes.bool,
  fixed: PropTypes.string,
  index: PropTypes.number,
  lastFixed: PropTypes.bool,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
}

Td.defaultProps = {
  fixed: '',
  style: {},
}

export default Td
