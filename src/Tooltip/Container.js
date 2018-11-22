import { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { scrollConsumer } from '../Scroll/context'
import { getUidStr } from '../utils/uid'

export default function (options) {
  const {
    show, hide, move, isCurrent,
  } = options

  class Container extends PureComponent {
    constructor(props) {
      super(props)
      this.handleHide = this.handleHide.bind(this)
      this.handleShow = this.handleShow.bind(this)
      this.tryHide = this.tryHide.bind(this)

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
      hide(this.props.delay)
    }

    getElement() {
      return document.querySelector(`.${this.getElementId()}`)
    }

    getElementId() {
      return `__tooltip_${this.id}__`
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
      const { left, top } = this.getPosition()
      const props = Object.assign({}, this.props, { style: { left: `${left}px`, top: `${top}px` } })
      show(props, this.id)
    }

    handleHide() {
      hide(this.props.delay)
    }

    render() {
      const { children, trigger } = this.props
      const className = classnames(children.props.className, this.getElementId())
      const props = { className }

      if (trigger === 'hover') {
        props.onMouseEnter = this.handleShow
        props.onMouseLeave = this.handleHide
      } else {
        props.onClick = () => {
          setTimeout(this.handleShow, 10)
        }
      }

      return cloneElement(children, props)
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
    trigger: PropTypes.oneOf(['click', 'hover']),
  }

  Container.defaultProps = {
    position: 'top',
    trigger: 'hover',
  }

  return scrollConsumer(Container)
}
