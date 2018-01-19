import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getParent } from '../utils/dom'

const events = ['scroll', 'resize', 'pageshow', 'load']

function getStyle(mode, offset, left, width) {
  return {
    position: 'fixed',
    left,
    width,
    [mode]: offset,
  }
}

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
    const { scrollElement } = this.props
    this.scrollElement = getParent(this.element, scrollElement)
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
    const scrollElement = this.scrollElement || document.body
    const scrollRect = scrollElement.getBoundingClientRect()

    const placeholderRect = this.placeholder ? this.placeholder.getBoundingClientRect() : null
    const viewHeight = window.innerHeight || document.documentElement.clientHeight

    const placeholderStyle = { width: selfRect.width, height: selfRect.height }

    let style
    let placeholder

    if (top !== undefined && mode !== 'bottom') {
      if (selfRect.top - top < 0) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && selfRect.top < placeholderRect.top) {
        this.setState({ mode: '' })
        style = {}
        placeholder = null
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = getStyle('top', top, placeholderRect.left, placeholderRect.width)
        placeholder = placeholderStyle
      }
    }

    if (bottom !== undefined && mode !== 'top') {
      if (selfRect.bottom + bottom > viewHeight) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && selfRect.bottom > placeholderRect.bottom) {
        this.setState({ mode: '' })
        style = {}
        placeholder = null
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = getStyle('bottom', bottom, placeholderRect.left, placeholderRect.width)
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

  bindElement(el) {
    this.element = el
  }

  bindPlaceholder(el) {
    this.placeholder = el
  }

  bindScroll() {
    events.forEach((e) => {
      window.addEventListener(e, this.setPosition)
    })
    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', this.setPosition)
    }
  }

  unbindScroll() {
    events.forEach((e) => {
      window.removeEventListener(e, this.setPosition)
    })
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.setPosition)
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
  className: PropTypes.string,
  scrollElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  style: PropTypes.object,
  top: PropTypes.number,
}

Sticky.defaultProps = {
  bottom: undefined,
  className: '',
  scrollElement: undefined,
  style: {},
  top: undefined,
}

export default Sticky
