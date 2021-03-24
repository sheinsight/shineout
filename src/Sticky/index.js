import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { getParent } from '../utils/dom/element'
import { eventPassive } from '../utils/dom/detect'
import { getProps, defaultProps } from '../utils/proptypes'
import { compose } from '../utils/func'
import { cssSupport, copyBoundingClientRect } from '../utils/dom/element'
import { docSize } from '../utils/dom/document'
import { isHidden } from '../utils/is'
import { consumer } from './context'

const events = ['scroll', 'resize', 'pageshow', 'load']
const supportSticky = cssSupport('position', 'sticky')

class Sticky extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.bindOrigin = this.bindOrigin.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handlePosition = this.handlePosition.bind(this)
    this.style = {}
  }

  componentDidMount() {
    super.componentDidMount()
    const { target } = this.props
    this.targetElement = getParent(this.element, target)
    this.handlePosition()
    this.bindScroll()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.needResetPostion && this.props.needResetPostion) {
      this.setPosition()
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.unbindScroll()
    if (this.scrollTimer) clearTimeout(this.scrollTimer)
  }

  getStyle(mode, offset, left, width) {
    const { zIndex = 900 } = this.props.style
    const { css } = this.props

    const style = {
      position: 'fixed',
      left,
      width,
      [mode]: offset,
      zIndex,
    }
    if (this.targetElement) {
      if (supportSticky && css) {
        style.position = 'sticky'
      } else {
        style.position = 'absolute'
        if (mode === 'top') {
          style.transform = `translateY(${offset + this.targetElement.scrollTop}px)`
        } else {
          style.transform = `translateY(${this.targetElement.scrollTop}px)`
        }
        delete style.left
      }
    }

    this.triggerChange(true, style)

    return style
  }

  setPosition() {
    const { bottom, top, target, css, needResetPostion } = this.props
    const { mode, scrollWidth } = this.state
    // If it is a hidden element, the position will not be updated
    if (needResetPostion === false) return

    const selfRect = copyBoundingClientRect(this.element)
    const { marginBottom, marginTop } = getComputedStyle(this.element)
    selfRect.height += parseFloat(marginBottom) + parseFloat(marginTop)
    const scrollElement = this.targetElement || document.body
    const scrollRect = scrollElement.getBoundingClientRect()

    const placeholderRect = this.placeholder ? copyBoundingClientRect(this.placeholder) : null
    const viewHeight = docSize.height

    if (this.origin) {
      const { width } = this.origin.getBoundingClientRect()
      selfRect.width = width
      if (placeholderRect) placeholderRect.width = width
    }

    const placeholderStyle = {
      width: selfRect.width,
      // if target element is not null, set height to 0
      height: target && supportSticky && css ? 0 : selfRect.height,
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
          this.triggerChange(false, style)
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
      } else if (
        placeholderRect &&
        (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom
      ) {
        this.setState({ mode: '' })
        style = {}
        placeholder = null
        this.triggerChange(false, style)
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
      this.style = style
      this.setState({ style })
    }
  }

  triggerChange(flag, style) {
    const { onChange } = this.props
    if (style.position === this.style.position) return
    if (typeof onChange === 'function') onChange(flag)
  }

  handlePosition() {
    const { css } = this.props
    if (this.locked && css) {
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

  bindOrigin(el) {
    this.origin = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  bindScroll() {
    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handlePosition, eventPassive)
    } else {
      events.forEach(e => {
        window.addEventListener(e, this.handlePosition)
      })
    }
  }

  unbindScroll() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handlePosition)
    } else {
      events.forEach(e => {
        window.removeEventListener(e, this.handlePosition)
      })
    }
  }

  render() {
    const { children, className, target, css } = this.props
    const { placeholder } = this.state

    let outerStyle = this.props.style
    let innerStyle = this.state.style
    if (target && supportSticky && css) {
      outerStyle = Object.assign({}, outerStyle, innerStyle)
      innerStyle = {}
    }

    return (
      <div style={outerStyle} className={className}>
        <div ref={this.bindElement} style={Object.assign({}, innerStyle, { display: 'flow-root' })}>
          {children}
        </div>
        <div ref={this.bindOrigin} />
        {placeholder && <div ref={this.bindPlaceholder} style={placeholder} />}
      </div>
    )
  }
}

Sticky.propTypes = {
  ...getProps(PropTypes),
  bottom: PropTypes.number,
  children: PropTypes.any.isRequired,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  top: PropTypes.number,
  css: PropTypes.bool,
  onChange: PropTypes.func,
}

Sticky.defaultProps = {
  ...defaultProps,
  css: true,
}

Sticky.displayName = 'ShineoutSticky'

export default compose(consumer)(Sticky)
