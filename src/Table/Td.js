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
    const {
      rowKey, expanded, data, expandKeys,
      expandClick,
    } = this.props
    if (expandKeys) {
      if (expandClick) expandClick(data, !expanded)
    } else {
      this.props.onExpand(rowKey, expanded ? undefined : this.cachedRender)
    }
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

  renderExpand(index) {
    const { expanded, render, data } = this.props
    if (typeof render !== 'function') return null

    let cachedRender = render(data, index)

    if (!cachedRender) return null

    if (typeof cachedRender !== 'function') {
      cachedRender = () => cachedRender
    }
    this.cachedRender = cachedRender
    return (
      <span
        className={tableClass('expand-indicator', `icon-expand-${expanded ? 'sub' : 'plus'}`)}
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
      case 'row-expand':
        return this.renderExpand(index)
      default:
        return typeof render === 'function' ? render(data, index) : data[render]
    }
  }

  render() {
    const {
      rowSpan, colSpan, fixed, style, firstFixed, lastFixed, type, align,
    } = this.props

    const className = classnames(
      this.props.className,
      tableClass(
        fixed === 'left' && CLASS_FIXED_LEFT,
        fixed === 'right' && CLASS_FIXED_RIGHT,
        firstFixed && 'fixed-first',
        lastFixed && 'fixed-last',
        (type === 'checkbox' || type === 'expand' || type === 'row-expand') && 'checkbox',
        `align-${align}`,
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
  align: PropTypes.oneOf(['left', 'center', 'right']),
  rowKey: PropTypes.any,
  rowSpan: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  expandKeys: PropTypes.array,
  expandClick: PropTypes.func,
  datum: PropTypes.object,
  render: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
}

Td.defaultProps = {
  fixed: '',
  style: {},
  align: 'left',
}

export default Td
