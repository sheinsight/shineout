import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getParent } from '../utils/dom'
import { styleProps, defaultStyleProps } from '../utils/proptypes'

const events = ['scroll', 'resize', 'pageshow', 'load']

class Sticky extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
    }

    this.bindElement = this.bindElement.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.setPosition = this.setPosition.bind(this)
  }

  componentDidMount() {
    const { target } = this.props
    this.targetElement = getParent(this.element, target)
    this.setPosition()
    this.bindScroll()
  }

  componentWillUnmount() {
    this.unbindScroll()
  }

  setPosition() {
    const { bottom, top } = this.props
    const { mode, scrollWidth } = this.state
    const selfRect = this.element.getBoundingClientRect()
    const scrollElement = this.targetElement || document.body
    const scrollRect = scrollElement.getBoundingClientRect()

    const placeholderRect = this.placeholder ? this.placeholder.getBoundingClientRect() : null
    const viewHeight = window.innerHeight || document.documentElement.clientHeight

    const placeholderStyle = { width: selfRect.width, height: selfRect.height }

    let style
    let placeholder
    let limitTop = top
    let limitBottom = viewHeight - bottom

    if (this.targetElement) {
      limitTop += scrollRect.top
      limitBottom = scrollRect.bottom - bottom
    }

    if (top !== undefined && mode !== 'bottom') {
      if (selfRect.top < limitTop) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && selfRect.top < placeholderRect.top) {
        this.setState({ mode: '' })
        style = {}
        placeholder = null
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = this.getStyle('top', top, placeholderRect.left, placeholderRect.width)
        placeholder = placeholderStyle
      }
    }

    if (bottom !== undefined && mode !== 'top') {
      if (selfRect.bottom > limitBottom) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom) {
        this.setState({ mode: '' })
        style = {}
        placeholder = null
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = this.getStyle('bottom', bottom, placeholderRect.left, placeholderRect.width)
        placeholder = placeholderStyle
      }
    }

    if (placeholder !== undefined) {
      this.setState({ placeholder })
    }
    if (style) {
      this.setState({ style })
    }
  }

  getStyle(mode, offset, left, width) {
    const { zIndex = 900 } = this.props.style
    const style = {
      position: 'fixed',
      left,
      width,
      [mode]: offset,
      zIndex,
    }

    if (this.targetElement) {
      style.position = 'absolute'
      if (mode === 'top') {
        style.top += this.targetElement.scrollTop + 0.5
      } else {
        style.bottom -= this.targetElement.scrollTop
      }
      delete style.left
    }

    return style
  }

  bindElement(el) {
    this.element = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  bindScroll() {
    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.setPosition)
    } else {
      events.forEach((e) => {
        window.addEventListener(e, this.setPosition)
      })
    }
  }

  unbindScroll() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.setPosition)
    } else {
      events.forEach((e) => {
        window.removeEventListener(e, this.setPosition)
      })
    }
  }

  render() {
    const { children, className } = this.props
    const { placeholder } = this.state

    return (
      <div style={this.props.style} className={className}>
        <div ref={this.bindElement} style={this.state.style}>
          {children}
        </div>
        { placeholder && <div ref={this.bindPlaceholder} style={placeholder} /> }
      </div>
    )
  }
}

Sticky.propTypes = {
  bottom: PropTypes.number,
  children: PropTypes.any.isRequired,
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  top: PropTypes.number,
  ...styleProps,
}

Sticky.defaultProps = {
  ...defaultStyleProps,
}

export default Sticky
