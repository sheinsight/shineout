import React, { PureComponent, cloneElement, isValidElement } from 'react'
import PropTypes from 'prop-types'
import { tooltipClass } from '../styles'
import { scrollConsumer } from '../Scroll/context'
import { getUidStr } from '../utils/uid'
import { getPosition } from '../utils/dom/popover'

export default function(options) {
  const { show, hide, move, isCurrent } = options

  class Container extends PureComponent {
    constructor(props) {
      super(props)
      this.handleShow = this.handleShow.bind(this)
      this.handleDismiss = this.handleDismiss.bind(this)
      this.tryHide = this.tryHide.bind(this)
      this.elementRef = this.elementRef.bind(this)

      this.id = getUidStr()
    }

    componentDidUpdate(prevProps) {
      if (!move || !isCurrent(this.id)) return

      const { scrollLeft, scrollTop } = this.props
      if (prevProps.scrollLeft !== scrollLeft || prevProps.scrollTop !== scrollTop) {
        const pos = this.getPosition()
        move(this.id, pos)
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
      return getPosition(position, el)
    }

    elementRef(el) {
      this.placeholderElement = el
    }

    tryHide() {
      const { scrollElement } = this.props
      const rect = this.getElement().getBoundingClientRect()
      const scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {}

      if (
        rect.bottom < scrollRect.top ||
        rect.top > scrollRect.bottom ||
        rect.right < scrollRect.left ||
        rect.left > scrollRect.right
      ) {
        hide(0)
      }
    }

    handleShow() {
      if (this.showTimer) clearTimeout(this.showTimer)
      const { delay } = this.props
      if (!delay) {
        this.showSync()
      } else {
        this.showTimer = setTimeout(() => {
          this.showSync()
        }, delay)
      }
    }

    handleDismiss() {
      clearTimeout(this.showTimer)
      hide()
    }

    showSync() {
      const pos = this.getPosition()
      const style = Object.keys(pos).reduce((data, key) => {
        data[key] = pos[key]
        return data
      }, {})
      const props = Object.assign({}, this.props, { style })
      show(props, this.id, this.props.style)
    }

    render() {
      const { children, trigger, disabledChild, tip, content } = this.props

      if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'))
        return null
      }

      if (!tip && !content) return children

      const inner = disabledChild ? (
        <span className={tooltipClass('disabled-wrapper')} style={{ cursor: 'not-allowed' }}>
          {cloneElement(children, { style: { ...children.props.style, pointerEvents: 'none' } })}
        </span>
      ) : (
        children
      )

      const props = { key: 'el' }
      if (trigger === 'hover') {
        props.onMouseEnter = this.handleShow
        props.onMouseLeave = this.handleDismiss
      } else {
        props.onClick = e => {
          if (e) e.stopPropagation()
          setTimeout(this.handleShow, 10)
          if (children.props.onClick) children.props.onClick()
        }
      }

      return [<noscript ref={this.elementRef} key="ns" />, cloneElement(inner, props)]
    }
  }

  Container.propTypes = {
    // eslint-disable-next-line
    animation: PropTypes.bool,
    children: PropTypes.element.isRequired,
    // eslint-disable-next-line
    content: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    delay: PropTypes.number,
    position: PropTypes.oneOf([
      'top-left',
      'top',
      'top-right',
      'left-top',
      'left',
      'left-bottom',
      'right-top',
      'right',
      'right-bottom',
      'bottom-left',
      'bottom',
      'bottom-right',
    ]),
    scrollElement: PropTypes.object,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    style: PropTypes.object,
    trigger: PropTypes.oneOf(['click', 'hover']),
    disabledChild: PropTypes.bool,
    tip: PropTypes.node,
  }

  Container.defaultProps = {
    animation: true,
    delay: 0,
    position: 'top',
    trigger: 'hover',
  }

  return scrollConsumer(Container)
}
