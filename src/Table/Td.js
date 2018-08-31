import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tableClass } from '../styles'
import Checkbox from './Checkbox'

export const CLASS_FIXED_LEFT = 'fixed-left'
export const CLASS_FIXED_RIGHT = 'fixed-right'

class Td extends PureComponent {
  constructor(props) {
    super(props)
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  handleExpandClick() {
    const { rowKey, expanded } = this.props
    this.props.onExpand(rowKey, expanded ? undefined : this.cachedRender)
  }

  renderCheckbox() {
    const { index, data, datum } = this.props
    return (
      <Checkbox
        data={data}
        index={index}
        datum={datum}
      />
    )
  }

  renderExpand() {
    const { expanded, render, data } = this.props
    if (typeof render !== 'function') return null

    let cachedRender = render(data)

    if (!cachedRender) return null

    if (typeof cachedRender !== 'function') {
      cachedRender = () => cachedRender
    }
    this.cachedRender = cachedRender
    return (
      <span
        className={tableClass(`icon-expand-${expanded ? 'sub' : 'plus'}`)}
        onClick={this.handleExpandClick}
      />
    )
  }

  renderContent() {
    const {
      type, render, data, index,
    } = this.props
    switch (type) {
      case 'checkbox':
        return this.renderCheckbox()
      case 'expand':
        return this.renderExpand()
      default:
        return typeof render === 'function' ? render(data, index) : data[render]
    }
  }

  render() {
    const {
      rowSpan, colSpan, fixed, style, firstFixed, lastFixed, type,
    } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
        firstFixed && 'fixed-first',
        lastFixed && 'fixed-last',
        (type === 'checkbox' || type === 'expand') && 'checkbox',
      ),
    )

    return (
      <td style={style} className={className} rowSpan={rowSpan} colSpan={colSpan}>
        { this.renderContent() }
      </td>
    )
  }
}

Td.propTypes = {
  data: PropTypes.object,
  colSpan: PropTypes.number,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  firstFixed: PropTypes.bool,
  fixed: PropTypes.string,
  index: PropTypes.number,
  lastFixed: PropTypes.bool,
  onExpand: PropTypes.func,
  rowKey: PropTypes.any,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  datum: PropTypes.object,
  render: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
}

Td.defaultProps = {
  fixed: '',
  style: {},
}

export default Td
