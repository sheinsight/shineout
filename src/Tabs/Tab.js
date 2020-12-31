import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tabsClass } from '../styles'
import { getUidStr } from '../utils/uid'
import { defer } from '../utils/uid'
import getDataset from '../utils/dom/getDataset'

class Tab extends PureComponent {
  constructor(props) {
    super(props)
    this.getActiveStyle = this.getActiveStyle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.uid = `tab_unique_${getUidStr()}`
  }

  componentDidMount() {
    defer(() => {
      if (this.props.isActive) this.handleClick(true)
    })
  }

  getActiveStyle() {
    const { shape, align, background, color, border, isActive, isVertical } = this.props

    if (shape === 'line' || shape === 'dash') return {}

    const style = { background, color }

    if (shape === 'bordered') return { background }

    if (shape !== 'line' && !isVertical)
      style.borderColor = `${border} ${border} ${isActive ? background : border} ${border}`

    if (shape !== 'line' && align === 'vertical-left')
      style.borderColor = `${border} ${isActive ? background : border}  ${border} ${border}`

    if (shape !== 'line' && align === 'vertical-right')
      style.borderColor = `${border} ${border} ${border} ${isActive ? background : border}`

    return style
  }

  handleClick(init) {
    const { onClick, id, isActive, disabled, last } = this.props
    if (disabled) return

    if (init !== true) onClick(id, isActive)
    if (!this.element) {
      this.element = document.querySelector(`.${this.uid}`)
    }
    if (this.element && this.element.getBoundingClientRect) {
      this.props.moveToCenter(this.element.getBoundingClientRect(), last, id === 0)
    }
  }

  render() {
    const { isActive, disabled, children, shape, ...otherProps } = this.props

    const style = this.getActiveStyle()
    const isBordered = shape === 'bordered'

    const props = {
      className: classnames(
        tabsClass(
          'tab',
          isActive && (isBordered ? 'tab-bordered-active' : 'active'),
          disabled && 'disabled',
          isBordered && 'tab-bordered'
        ),
        this.uid
      ),
      onClick: this.handleClick,
      style,
      ...getDataset(otherProps),
    }

    if (children.type && children.type.isTabLink) {
      return React.cloneElement(children, { ...props })
    }

    return <div {...props}>{children}</div>
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
  last: PropTypes.bool,
}

Tab.defaultProps = {
  border: 'transparent',
}

export default Tab
