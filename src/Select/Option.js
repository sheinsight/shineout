import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from '../styles'
import { isObject } from '../utils/is'
import shallowEqual from '../utils/shallowEqual'
import icons from '../icons'

class Option extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnter = this.handleHover.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filterText) return true
    if (!shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)) return true
    return false
  }

  handleClick() {
    const { data, onClick, isActive, index, disabled, groupKey } = this.props

    if (this.locked || disabled || (data && data[groupKey])) return
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
    const isGroupTitle = data && data[groupKey]
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
        {isActive && icons.Check}
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
  filterText: PropTypes.string,
}

export default Option
