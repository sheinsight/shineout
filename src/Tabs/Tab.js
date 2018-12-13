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
    const {
      shape, align, background, color, border,
      isActive, isVertical,
    } = this.props

    if (shape === 'line') return {}

    const style = { background, color }

    if (shape !== 'line' && !isVertical) style.borderColor = `${border} ${border} ${isActive ? background : border} ${border}`

    if (shape !== 'line' && align === 'vertical-left') style.borderColor = `${border} ${isActive ? background : border}  ${border} ${border}`

    if (shape !== 'line' && align === 'vertical-right') style.borderColor = `${border} ${border} ${border} ${isActive ? background : border}`

    return style
  }

  bindElement(el) {
    this.element = el
  }

  handleClick() {
    const { onClick, id, isActive } = this.props
    onClick(id, isActive)
    this.props.moveToCenter(this.element.getBoundingClientRect())
  }

  render() {
    const {
      isActive,
    } = this.props

    const style = this.getActiveStyle()

    return (
      <div
        ref={this.bindElement}
        className={tabsClass('tab', isActive && 'active')}
        style={style}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    )
  }
}

Tab.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
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
