import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

export default function (show, hide) {
  class Container extends PureComponent {
    constructor(props) {
      super(props)
      this.handleHide = this.handleHide.bind(this)
      this.handleShow = this.handleShow.bind(this)
    }

    componentWillUnmount() {
      hide(this.props.delay)
    }

    handleShow() {
      const { position } = this.props

      const el = findDOMNode(this)
      const rect = el.getBoundingClientRect()
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

      let left
      let top

      switch (position) {
        case 'top-left':
          left = scrollLeft + rect.left
          top = scrollTop + rect.top
          break
        case 'top':
          left = scrollLeft + rect.left + (rect.width / 2)
          top = scrollTop + rect.top
          break
        case 'top-right':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.top
          break
        case 'left':
          left = scrollLeft + rect.left
          top = scrollTop + rect.top + (rect.height / 2)
          break
        case 'right':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.top + (rect.height / 2)
          break
        case 'bottom-left':
          left = scrollLeft + rect.left
          top = scrollTop + rect.top + rect.height
          break
        case 'bottom':
          left = scrollLeft + rect.left + (rect.width / 2)
          top = scrollTop + rect.top + rect.height
          break
        case 'bottom-right':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.top + rect.height
          break
        default:
      }

      const props = Object.assign({}, this.props, { style: { left: `${left}px`, top: `${top}px` } })
      show(props)
    }

    handleHide() {
      hide(this.props.delay)
    }

    render() {
      const { children, trigger, style } = this.props
      const events = {}

      if (trigger === 'hover') {
        events.onMouseEnter = this.handleShow
        events.onMouseLeave = this.handleHide
      } else {
        events.onClick = () => {
          setTimeout(this.handleShow, 10)
        }
      }

      const newStyle = Object.assign({ display: 'inline-block' }, style)

      return <span {...events} style={newStyle}>{children}</span>
    }
  }

  Container.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    content: PropTypes.element,
    delay: PropTypes.number,
    position: PropTypes.oneOf(['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right']),
    style: PropTypes.object,
    tip: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']),
  }

  Container.defaultProps = {
    position: 'top',
    trigger: 'hover',
  }

  return Container
}
