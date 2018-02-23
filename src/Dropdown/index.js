import React, { PureComponent, Children, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'
import Button from '../Button'
import { dropdownClass } from '../styles'
import { FadeList } from '../List'

class Dropdown extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      position: 'bottom-left',
      show: false,
    }

    this.bindButton = this.bindButton.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }

  getPosition() {
    return this.props.position || this.state.position
  }

  bindButton(el) {
    this.button = findDOMNode(el)
  }

  bindElement(el) {
    this.element = el
  }

  handleFocus() {
    let f = 'bottom'
    const s = 'left'
    const height = window.innerHeight || document.documentElement.clientHeight
    const rect = this.element.getBoundingClientRect()
    if (height - rect.bottom < 200) {
      f = 'top'
    }

    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
    }

    this.button.focus()
    this.setState({ show: true, position: `${f}-${s}` })
  }

  handleBlur() {
    // wait item event execute
    this.closeTimer = setTimeout(() => {
      if (!this.isUnmounted) this.setState({ show: false })
    }, 200)
  }

  handleHover() {
    const { hover } = this.props
    const { show } = this.state
    if (show || !hover) return

    this.handleFocus()
  }

  renderButton() {
    const {
      placeholder, type, outline, size, href, onClick, disabled,
    } = this.props

    if (onClick || href) {
      return (
        <Button.Group outline={outline} size={size} type={type}>
          <Button
            href={href}
            disabled={disabled}
            onClick={onClick}
          >{placeholder}
          </Button>
          <Button
            ref={this.bindButton}
            disabled={disabled}
            onClick={this.handleFocus}
            onMouseEnter={this.handleHover}
            onBlur={this.handleBlur}
            className={dropdownClass('button', 'split')}
          />
        </Button.Group>
      )
    }

    return (
      <Button
        disabled={disabled}
        ref={this.bindButton}
        onClick={this.handleFocus}
        onMouseEnter={this.handleHover}
        onBlur={this.handleBlur}
        outline={outline}
        className={dropdownClass('button')}
        type={type}
        size={size}
      >
        {placeholder}
      </Button>
    )
  }

  render() {
    const {
      className, style, children, width,
    } = this.props
    const { show } = this.state
    const position = this.getPosition()

    let wrapClassName = dropdownClass('_', position, show && 'show')
    if (className) wrapClassName += ` ${className}`

    const itemClassName = dropdownClass('item', !width && 'no-width')

    return (
      <div ref={this.bindElement} className={wrapClassName} style={style}>
        {this.renderButton()}
        <FadeList className={dropdownClass('menu')} style={{ width }} show={show}>
          {
            Children.toArray(children).map((child, i) => {
              if (typeof child === 'string') {
                return <a key={i} className={itemClassName}>{child}</a>
              }

              if (child.type === 'hr') return child

              return cloneElement(child, { className: itemClassName })
            })
          }
        </FadeList>
      </div>
    )
  }
}

Dropdown.propTypes = {
  ...getProps('placeholder', 'type'),
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  hover: PropTypes.bool,
  position: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Dropdown.defaultProps = {
  ...defaultProps,
  disabled: false,
}

export default Dropdown
