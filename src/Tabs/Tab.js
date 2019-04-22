import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Tab extends PureComponent {
  constructor(props) {
    super(props)
    this.getActiveStyle = this.getActiveStyle.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  getActiveStyle() {
    const { shape, align, background, color, border, isActive, isVertical } = this.props

    if (shape === 'line') return {}

    const style = { background, color }

    if (shape !== 'line' && !isVertical)
      style.borderColor = `${border} ${border} ${isActive ? background : border} ${border}`

    if (shape !== 'line' && align === 'vertical-left')
      style.borderColor = `${border} ${isActive ? background : border}  ${border} ${border}`

    if (shape !== 'line' && align === 'vertical-right')
      style.borderColor = `${border} ${border} ${border} ${isActive ? background : border}`

    return style
  }

  bindElement(el) {
    this.element = el
  }

  handleClick() {
    const { onClick, id, isActive, disabled } = this.props
    if (disabled) return
    onClick(id, isActive)
    if (this.element.getBoundingClientRect) {
      this.props.moveToCenter(this.element.getBoundingClientRect())
    }
  }

  render() {
    const { isActive, disabled, children } = this.props

    const style = this.getActiveStyle()

    const props = {
      className: tabsClass('tab', isActive && 'active', disabled && 'disabled'),
      onClick: this.handleClick,
      style,
    }

    if (children.type && children.type.isTabLink) {
      return React.cloneElement(children, { ...props, elRef: this.bindElement })
    }

    return (
      <div {...props} ref={this.bindElement}>
        {children}
      </div>
    )
  }
}

Tab.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  isVertical: PropTypes.bool,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  moveToCenter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  shape: PropTypes.string,
  align: PropTypes.oneOf(['left', 'right', 'vertical-left', 'vertical-right']),
}

Tab.defaultProps = {
  border: 'transparent',
}

export default Tab
