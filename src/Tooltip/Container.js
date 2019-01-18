import React, { PureComponent, cloneElement, isValidElement } from 'react'
import PropTypes from 'prop-types'
import { scrollConsumer } from '../Scroll/context'
import { getUidStr } from '../utils/uid'

export default function (options) {
  const {
    show, hide, move, isCurrent,
  } = options

  class Container extends PureComponent {
    constructor(props) {
      super(props)
      this.handleShow = this.handleShow.bind(this)
      this.tryHide = this.tryHide.bind(this)
      this.elementRef = this.elementRef.bind(this)

      this.id = getUidStr()
    }

    componentDidUpdate(prevProps) {
      if (!move || !isCurrent(this.id)) return

      const { scrollLeft, scrollTop } = this.props
      if (prevProps.scrollLeft !== scrollLeft || prevProps.scrollTop !== scrollTop) {
        const { left, top } = this.getPosition()
        move(this.id, left, top)
        this.tryHide()
      }
    }

    componentWillUnmount() {
      hide()
    }

    getElement() {
      return this.placeholderElement.nextSibling
    }

    getPosition() {
      const { position } = this.props

      const el = this.getElement()
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

      return { left, top }
    }

    elementRef(el) {
      this.placeholderElement = el
    }

    tryHide() {
      const { scrollElement } = this.props
      const rect = this.getElement().getBoundingClientRect()
      const scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {}

      if (rect.bottom < scrollRect.top || rect.top > scrollRect.bottom ||
        rect.right < scrollRect.left || rect.left > scrollRect.right) {
        hide(0)
      }
    }

    handleShow() {
      if (this.showTimer) clearTimeout(this.showTimer)
      this.showTimer = setTimeout(() => {
        const { left, top } = this.getPosition()
        const props = Object.assign({}, this.props, { style: { left: `${left}px`, top: `${top}px` } })
        show(props, this.id, this.props.style)
      }, this.props.delay)
    }

    render() {
      const { children, trigger } = this.props

      if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'))
        return null
      }

      const props = { key: 'el' }
      if (trigger === 'hover') {
        props.onMouseEnter = this.handleShow
        props.onMouseLeave = hide
      } else {
        props.onClick = () => {
          setTimeout(this.handleShow, 10)
        }
      }

      return [<noscript ref={this.elementRef} key="ns" />, cloneElement(children, props)]
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
    scrollElement: PropTypes.object,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    style: PropTypes.object,
    trigger: PropTypes.oneOf(['click', 'hover']),
  }

  Container.defaultProps = {
    delay: 0,
    position: 'top',
    trigger: 'hover',
  }

  return scrollConsumer(Container)
}
