import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getParent } from '../utils/dom/element'
import { eventPassive } from '../utils/dom/detect'
import { getProps, defaultProps } from '../utils/proptypes'
import { cssSupport } from '../utils/dom/element'

const events = ['scroll', 'resize', 'pageshow', 'load']
const supportSticky = cssSupport('position', 'sticky')

class Sticky extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handlePosition = this.handlePosition.bind(this)
  }

  componentDidMount() {
    const { target } = this.props
    this.targetElement = getParent(this.element, target)
    this.handlePosition()
    this.bindScroll()
  }

  componentWillUnmount() {
    this.unbindScroll()
    if (this.scrollTimer) clearTimeout(this.scrollTimer)
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
      if (supportSticky) {
        style.position = 'sticky'
      } else {
        style.position = 'absolute'
        if (mode === 'top') {
          style.transform = `translateY(${offset}${this.targetElement.scrollTop}px)`
        } else {
          style.transform = `translateY(${offset}${this.targetElement.scrollTop}px)`
        }
        delete style.left
      }
    }

    return style
  }

  setPosition() {
    const { bottom, top, target } = this.props
    const { mode, scrollWidth } = this.state
    const selfRect = this.element.getBoundingClientRect()
    const scrollElement = this.targetElement || document.body
    const scrollRect = scrollElement.getBoundingClientRect()

    const placeholderRect = this.placeholder ? this.placeholder.getBoundingClientRect() : null
    const viewHeight = window.innerHeight || document.documentElement.clientHeight

    const placeholderStyle = {
      width: selfRect.width,
      // if target element is not null, set height to 0
      height: target && supportSticky ? 0 : selfRect.height,
    }

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
        if (!(target && selfRect.top === limitTop)) {
          this.setState({ mode: '' })
          style = {}
          placeholder = null
        }
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
      } else if (placeholderRect &&
        (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom) {
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

  handlePosition() {
    if (this.locked) {
      this.scrollCount += 1
      return
    }

    this.locked = true
    this.scrollCount = 0

    this.setPosition()
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.scrollCount > 0) {
        this.handlePosition()
      }
    }, 48)
  }

  bindElement(el) {
    this.element = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  bindScroll() {
    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handlePosition, eventPassive)
    } else {
      events.forEach((e) => {
        window.addEventListener(e, this.handlePosition)
      })
    }
  }

  unbindScroll() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handlePosition)
    } else {
      events.forEach((e) => {
        window.removeEventListener(e, this.handlePosition)
      })
    }
  }

  render() {
    const { children, className, target } = this.props
    const { placeholder } = this.state

    let outerStyle = this.props.style
    let innerStyle = this.state.style
    if (target && supportSticky) {
      outerStyle = Object.assign({}, outerStyle, innerStyle)
      innerStyle = {}
    }

    return (
      <div style={outerStyle} className={className}>
        <div ref={this.bindElement} style={innerStyle}>
          {children}
        </div>
        { placeholder && <div ref={this.bindPlaceholder} style={placeholder} /> }
      </div>
    )
  }
}

Sticky.propTypes = {
  ...getProps(PropTypes),
  bottom: PropTypes.number,
  children: PropTypes.any.isRequired,
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  top: PropTypes.number,
}

Sticky.defaultProps = {
  ...defaultProps,
}

Sticky.displayName = 'ShineoutSticky'

export default Sticky
