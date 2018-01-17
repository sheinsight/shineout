import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getParent } from '../utils/dom'

const events = ['scroll', 'resize', 'pageshow', 'load']

class Sticky extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      lastScroll: 0,
    }

    this.bindRef = this.bindRef.bind(this)
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
    const { mode, offset } = this.props
    const { lastScroll, scrollWidth } = this.state
    const selfRect = this.element.getBoundingClientRect()
    const scrollRect = (this.scrollElement || document.body).getBoundingClientRect()

    if (mode === 'top') {
      if (selfRect.top - offset < 0) {
        this.setState({
          lastScroll: scrollRect.top - selfRect.top,
          scrollWidth: scrollRect.width,
          style: this.getStyle(selfRect.left),
        })
      } else if (scrollRect.top - selfRect.top > lastScroll) {
        this.setState({
          lastScroll: 0,
          style: undefined,
        })
      } else if (scrollWidth && scrollWidth !== scrollRect.width) {
        this.setState({
          scrollWidth: scrollRect.width,
          style: this.getStyle(selfRect.left + (scrollRect.width - scrollWidth)),
        })
      }
    }
  }

  getStyle(left) {
    const { mode, offset } = this.props

    return {
      position: 'fixed',
      left,
      [mode]: offset,
    }
  }

  bindRef(el) {
    this.element = el
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

    return (
      <div style={this.props.style} className={className}>
        <div ref={this.bindRef} style={this.state.style}>
          {children}
        </div>
      </div>
    )
  }
}

Sticky.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  mode: PropTypes.oneOf(['top', 'bottom']),
  offset: PropTypes.number,
  scrollElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  style: PropTypes.object,
}

Sticky.defaultProps = {
  className: '',
  mode: 'top',
  offset: 0,
  scrollElement: undefined,
  style: {},
}

export default Sticky
