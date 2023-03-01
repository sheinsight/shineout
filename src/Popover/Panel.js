import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Component } from '../component'
import { getPosition } from '../utils/dom/popover'
import { isFunc } from '../utils/is'
import { getParent } from '../utils/dom/element'
import { popoverClass } from './styles'
import { docSize } from '../utils/dom/document'
import isDOMElement from '../utils/dom/isDOMElement'
import { Provider as AbsoluteProvider } from '../Table/context'
// import { getRTLPosition } from '../utils/strings'
// import { isRTL } from '../config'
import { consumer, Provider } from './context'
import { getUidStr } from '../utils/uid'
import getCommonContainer from '../utils/dom/popContainer'

const emptyEvent = e => e.stopPropagation()

// const getCurrentPosition = position => {
//   if (isRTL()) {
//     return getRTLPosition(position)
//   }
//   return position
// }

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = { show: props.defaultVisible || false }
    this.isRendered = false
    this.chain = []
    this.id = `popover_${getUidStr()}`
    this.placeholderRef = this.placeholderRef.bind(this)
    this.clickAway = this.clickAway.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
    this.setShow = this.setShow.bind(this)
    this.bindChain = this.bindChain.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.createContainer = this.createContainer.bind(this)

    this.element = document.createElement('div')
  }

  componentDidMount() {
    super.componentDidMount()

    const { bindChain } = this.props
    if (bindChain) bindChain(this.id)

    this.parentElement = this.placeholder.parentElement
    this.bindEvents()

    if (this.props.visible) {
      this.createContainer()
      this.forceUpdate()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible === true || nextProps.visible === true) return true
    if (this.state.show === true || nextState.show === true) return true
    return false
  }

  componentDidUpdate(prevProps) {
    if (this.props.trigger !== prevProps.trigger) {
      this.bindEvents()
    }
    if (this.props.zIndex !== prevProps.zIndex && this.element) {
      this.element.style.zIndex = this.props.zIndex
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.parentElement.removeEventListener('mouseenter', this.handleShow)
    this.parentElement.removeEventListener('mouseleave', this.handleHide)
    this.parentElement.removeEventListener('click', this.handleShow)

    document.removeEventListener('click', this.clickAway)
    document.removeEventListener('mousedown', this.clickAway)

    if (!this.container) return
    if (this.container === getCommonContainer()) {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element)
      }
    } else {
      this.container.parentNode.removeChild(this.container)
    }
  }

  setShow(show) {
    const { onVisibleChange, mouseEnterDelay, mouseLeaveDelay, trigger } = this.props
    const delay = show ? mouseEnterDelay : mouseLeaveDelay
    this.delayTimeout = setTimeout(
      () => {
        if (onVisibleChange) onVisibleChange(show)
        this.setState({ show })
        if (show && this.props.onOpen) this.props.onOpen()
        if (!show && this.props.onClose) this.props.onClose()

        if (show) {
          this.bindScrollDismiss(true)
          document.addEventListener('mousedown', this.clickAway)
        } else {
          this.bindScrollDismiss(false)
          document.removeEventListener('mousedown', this.clickAway)
        }
      },
      trigger === 'hover' ? delay : 0
    )
  }

  getPositionStr() {
    let { position } = this.props
    const { priorityDirection } = this.props
    if (position) return position

    const rect = this.parentElement.getBoundingClientRect()
    const horizontalPoint = rect.left + rect.width / 2
    const verticalPoint = rect.top + rect.height / 2
    const windowHeight = docSize.height
    const windowWidth = docSize.width
    let tempPriorityDirection = priorityDirection
    if (priorityDirection === 'auto') {
      const maxX = Math.max(rect.left, windowWidth - rect.left - rect.width)
      const maxY = Math.max(rect.top, windowHeight - rect.top - rect.height)
      tempPriorityDirection = maxX > maxY ? 'horizontal' : 'vertical'
    }

    if (tempPriorityDirection === 'horizontal') {
      if (horizontalPoint > windowWidth / 2) position = 'left'
      else position = 'right'

      if (verticalPoint > windowHeight * 0.6) {
        position += '-bottom'
      } else if (verticalPoint < windowHeight * 0.4) {
        position += '-top'
      }
    } else {
      if (verticalPoint > windowHeight / 2) position = 'top'
      else position = 'bottom'

      if (horizontalPoint > windowWidth * 0.6) {
        position += '-right'
      } else if (horizontalPoint < windowWidth * 0.4) {
        position += '-left'
      }
    }
    return position
  }

  getContainer() {
    const { getPopupContainer } = this.props
    let container
    if (getPopupContainer) container = getPopupContainer()
    if (container && isDOMElement(container)) {
      const child = document.createElement('div')
      child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ')
      return container.appendChild(child)
    }
    return getCommonContainer()
  }

  createContainer() {
    const { zIndex } = this.props
    if (!this.container || !document.documentElement.contains(this.container)) {
      this.container = this.getContainer()
      this.element.style.zIndex = zIndex
      this.container.appendChild(this.element)
    }
  }

  updatePosition(position) {
    const pos = getPosition(position, this.parentElement, this.container)
    // eslint-disable-next-line
    Object.keys(pos).forEach(attr => {
      this.element.style[attr] = pos[attr]
    })
  }

  bindEvents() {
    const { trigger, clickToCancelDelay, mouseEnterDelay } = this.props
    if (trigger === 'hover') {
      this.parentElement.addEventListener('mouseenter', this.handleShow)
      this.parentElement.addEventListener('mouseleave', this.handleHide)
      this.element.addEventListener('mouseenter', this.handleShow)
      this.element.addEventListener('mouseleave', this.handleHide)
      this.parentElement.removeEventListener('click', this.handleShow)
      if (clickToCancelDelay && mouseEnterDelay > 0) {
        this.parentElement.addEventListener('click', this.handleCancel)
      }
    } else {
      this.parentElement.addEventListener('click', this.handleShow)
      this.parentElement.removeEventListener('click', this.handleCancel)
      this.parentElement.removeEventListener('mouseenter', this.handleShow)
      this.parentElement.removeEventListener('mouseleave', this.handleHide)
      this.element.removeEventListener('mouseenter', this.handleShow)
      this.element.removeEventListener('mouseleave', this.handleHide)
    }
  }

  placeholderRef(el) {
    this.placeholder = el
  }

  clickAway(e) {
    if (this.parentElement.contains(e.target)) return
    if (this.element.contains(e.target)) return
    if (getParent(e.target, `.${popoverClass('_')}`)) return
    this.handleHide(0)
  }

  bindScrollDismiss(show) {
    const { scrollDismiss } = this.props
    if (!scrollDismiss) return
    let target = document
    if (typeof scrollDismiss === 'function') target = scrollDismiss()
    const method = show ? target.addEventListener : target.removeEventListener
    method.call(target, 'scroll', this.handleHide)
  }

  bindChain(id) {
    this.chain.push(id)
  }

  handleShow() {
    this.createContainer()
    if (this.delayTimeout) clearTimeout(this.delayTimeout)
    if (this.state.show) return
    this.setShow(true)
  }

  isChildren(el) {
    for (let i = 0; i < this.chain.length; i++) if (getParent(el, `.${this.chain[i]}`)) return true
    return false
  }

  handleCancel() {
    if (this.delayTimeout) clearTimeout(this.delayTimeout)
  }

  handleHide(e) {
    if (e && this.isChildren(e.relatedTarget)) return
    if (this.delayTimeout) clearTimeout(this.delayTimeout)
    this.setShow(false)
  }

  render() {
    const { background, border, children, type, visible, showArrow, useTextStyle } = this.props
    const show = typeof visible === 'boolean' ? visible : this.state.show
    if ((!this.isRendered && !show) || !this.parentElement || !children) {
      return <noscript ref={this.placeholderRef} />
    }

    this.isRendered = true
    const colorStyle = { background, borderColor: border }
    const innerStyle = Object.assign({}, this.props.style, { background })
    const position = this.getPositionStr()
    // eslint-disable-next-line
    const style = this.element.style
    if (show) {
      // 先隐藏再设置样式这样可以减少回流
      style.display = 'none'
      this.updatePosition(position)
      if (background) style.background = background
      if (border) style.borderColor = border
      style.display = 'block'
    } else {
      style.display = 'none'
    }
    this.element.className = classnames(popoverClass('_', position, type), this.props.className, this.id)
    let childrened = isFunc(children) ? children(this.handleHide) : children
    if (typeof childrened === 'string' || useTextStyle)
      childrened = <span className={popoverClass('text')}>{childrened}</span>
    return ReactDOM.createPortal(
      [
        showArrow && <div key="arrow" className={popoverClass('arrow')} style={colorStyle} />,
        <div key="content" onClick={emptyEvent} className={popoverClass('content')} style={innerStyle}>
          <Provider value={this.bindChain}>
            <AbsoluteProvider value={false}>{childrened}</AbsoluteProvider>
          </Provider>
        </div>,
      ],
      this.element
    )
  }
}

Panel.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  position: PropTypes.string,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(['click', 'hover']),
  type: PropTypes.string,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  defaultVisible: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  className: PropTypes.string,
  priorityDirection: PropTypes.string,
  getPopupContainer: PropTypes.func,
  scrollDismiss: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  showArrow: PropTypes.bool,
  bindChain: PropTypes.func,
  zIndex: PropTypes.number,
  clickToCancelDelay: PropTypes.bool,
  useTextStyle: PropTypes.bool,
}

Panel.defaultProps = {
  background: '',
  trigger: 'hover',
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0,
  priorityDirection: 'vertical',
  showArrow: true,
}

export default consumer(Panel)
