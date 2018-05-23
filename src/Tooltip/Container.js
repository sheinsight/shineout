import { PureComponent, cloneElement } from 'react'
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
        case 'left-top':
          left = scrollLeft + rect.left
          top = scrollTop + rect.top
          break
        case 'left':
          left = scrollLeft + rect.left
          top = scrollTop + rect.top + (rect.height / 2)
          break
        case 'left-bottom':
          left = scrollLeft + rect.left
          top = scrollTop + rect.bottom
          break
        case 'right-top':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.top
          break
        case 'right':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.top + (rect.height / 2)
          break
        case 'right-bottom':
          left = scrollLeft + rect.left + rect.width
          top = scrollTop + rect.bottom
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
      const { children, trigger } = this.props
      const events = {}

      if (trigger === 'hover') {
        events.onMouseEnter = this.handleShow
        events.onMouseLeave = this.handleHide
      } else {
        events.onClick = () => {
          setTimeout(this.handleShow, 10)
        }
      }

      return cloneElement(children, events)
    }
  }

  Container.propTypes = {
    children: PropTypes.element.isRequired,
    // eslint-disable-next-line
    content: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    delay: PropTypes.number,
    position: PropTypes.oneOf(['top-left', 'top', 'top-right', 'left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'bottom-left', 'bottom', 'bottom-right']),
    // eslint-disable-next-line
    tip: PropTypes.string,
    trigger: PropTypes.oneOf(['click', 'hover']),
  }

  Container.defaultProps = {
    position: 'top',
    trigger: 'hover',
  }

  return Container
}
