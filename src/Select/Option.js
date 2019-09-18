import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from '../styles'
import { isObject } from '../utils/is'

class Option extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnter = this.handleHover.bind(this)
  }

  handleClick() {
    const { data, onClick, isActive, index, disabled, groupKey } = this.props

    if (this.locked || disabled || data[groupKey]) return
    this.locked = true

    onClick(!isActive, data, index)

    setTimeout(() => {
      this.locked = false
    }, 200)
  }

  handleHover() {
    this.props.onHover(this.props.index)
  }

  render() {
    const { data, isActive, index, renderItem, isHover, disabled, groupKey } = this.props
    const isGroupTitle = data[groupKey]
    const className = classnames(
      selectClass('option', isActive && 'active', isHover && 'hover', disabled && 'disabled', isGroupTitle && 'group'),
      `option-${index}`
    )

    const result = isGroupTitle ? data[groupKey] : renderItem(data, index)
    const title = typeof result === 'string' ? result : ''

    if (isObject(data) && result === data) {
      console.warn('renderItem is essential when data element is Object')
    }

    return (
      <a tabIndex={-1} onClick={this.handleClick} onMouseEnter={this.handleEnter} className={className} title={title}>
        {result}
        {isActive && (
          <svg className={selectClass('check')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path d="M913.017 237.02c-25.311-25.312-66.349-25.312-91.66 0l-412.475 412.474-206.237-206.237c-25.312-25.312-66.35-25.312-91.661 0s-25.312 66.35 0 91.66l252.067 252.067c0.729 0.73 1.439 1.402 2.134 2.029 25.434 23.257 64.913 22.585 89.527-2.029l458.303-458.303c25.313-25.312 25.313-66.35 0.001-91.661z" />
          </svg>
        )}
      </a>
    )
  }
}

Option.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  groupKey: PropTypes.string,
}

export default Option
