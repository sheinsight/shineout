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
    const { rowKey, expanded, content } = this.props
    this.props.onExpand(rowKey, expanded ? undefined : content)
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

  renderContent() {
    const { content, expanded, type } = this.props
    switch (type) {
      case 'checkbox':
        return this.renderCheckbox()
      case 'expand':
        if (!content) return undefined
        return (
          <span
            className={tableClass(`icon-expand-${expanded ? 'sub' : 'plus'}`)}
            onClick={this.handleExpandClick}
          />
        )
      default:
        return content
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
        type === 'checkbox' && 'checkbox',
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
  content: PropTypes.any,
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
}

Td.defaultProps = {
  fixed: '',
  style: {},
}

export default Td
