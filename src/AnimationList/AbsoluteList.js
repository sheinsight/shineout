import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shallowEqual from '../utils/shallowEqual'
import { compose } from '../utils/func'
import { scrollConsumer } from '../Scroll/context'
import { listClass } from '../DataList/styles'
import { docScroll, docSize } from '../utils/dom/document'
import { getRTLPosition } from '../utils/strings'
import zIndexConsumer from '../Modal/context'
import { isRTL } from '../config'

const PICKER_V_MARGIN = 4
let root
function initRoot() {
  root = document.createElement('div')
  root.className = listClass('root')
  document.body.appendChild(root)
}

const listPosition = ['drop-down', 'drop-up']
const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']
const dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

export default function(List) {
  class AbsoluteList extends Component {
    state = {
      overdoc: false,
    }

    constructor(props) {
      super(props)
      this.handleRef = this.handleRef.bind(this)
      if (!props.absolute) return
      this.lastStyle = {}

      if (!root) initRoot()
      this.container = typeof this.props.absolute === 'function' ? this.props.absolute() : root
      this.element = document.createElement('div')
      if (this.container) this.container.appendChild(this.element)
      if (props.getResetPosition) {
        props.getResetPosition(this.resetPosition.bind(this))
      }
    }

    componentDidMount() {
      if (this.props.absolute && !this.container) {
        this.container = typeof this.props.absolute === 'function' ? this.props.absolute() : root
        this.container.appendChild(this.element)
        if (this.props.focus) {
          this.forceUpdate()
        }
      }
    }

    componentDidUpdate(prevProps) {
      if (shallowEqual(prevProps.value, this.props.value)) return
      if (!this.props.focus) this.ajustdoc = false
      setTimeout(() => {
        this.forceUpdate()
      })
    }

    componentWillUnmount() {
      const { absolute } = this.props
      if (!absolute) return
      if (this.container) {
        this.container.removeChild(this.element)
      }
    }

    getPosition(rect) {
      const { fixed, absolute } = this.props
      let { position } = this.props

      const rtl = isRTL()
      const style = {
        position: 'absolute',
      }
      if (fixed) {
        const widthKey = fixed === 'min' ? 'minWidth' : 'width'
        style[widthKey] = rect.width
      }
      if (dropdownPosition.includes(position)) {
        position = position
          .split('-')
          .reverse()
          .join('-')
      }

      if (rtl) {
        position = getRTLPosition(position)
      }

      let containerScroll = docScroll
      let containerRect = { left: 0, top: 0, right: 0, bottom: 0 }
      const { container } = this
      if (typeof absolute === 'function' && container) {
        containerRect = container.getBoundingClientRect()
        containerScroll = {
          left: container.scrollLeft,
          top: container.scrollTop,
        }
      }
      this.containerRect = containerRect

      if (listPosition.includes(position)) {
        style.left = rect.left - containerRect.left + containerScroll.left
        if (rtl) {
          style.left += rect.width
        }
        if (position === 'drop-down') {
          style.top = rect.top - containerRect.top + rect.height + containerScroll.top
        } else {
          style.bottom = -(rect.top - containerRect.top + containerScroll.top)
        }
      } else if (pickerPosition.includes(position)) {
        const [h, v] = position.split('-')
        if (h === 'left') {
          style.left = rect.left - containerRect.left + containerScroll.left
        } else {
          style.left = rect.right - containerRect.right + containerScroll.left
          style.transform = 'translateX(-100%)'
        }
        if (v === 'bottom') {
          style.top = rect.bottom - containerRect.bottom + containerScroll.top + PICKER_V_MARGIN
        } else {
          style.top = rect.top - containerRect.top + containerScroll.top - PICKER_V_MARGIN
          style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
        }
      }
      return style
    }

    getStyle() {
      const { parentElement, scrollElement, focus } = this.props
      const lazyResult = { focus, style: this.lastStyle }
      if (!focus) return lazyResult
      let style = {}
      if (parentElement) {
        const rect = parentElement.getBoundingClientRect()
        const scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {}

        if (
          rect.bottom < scrollRect.top ||
          rect.top > scrollRect.bottom ||
          rect.right < scrollRect.left ||
          rect.left > scrollRect.right
        ) {
          return { focus: false, style: this.lastStyle }
        }
        style = this.getPosition(rect)
      }

      if (shallowEqual(style, this.lastStyle)) return lazyResult

      this.lastStyle = style
      return { focus, style }
    }

    resetPosition(clean) {
      const { focus, parentElement } = this.props
      if (!this.el || !focus || (this.ajustdoc && !clean)) return
      const pos = this.el.getBoundingClientRect()
      let { left } = pos
      if (parentElement) {
        // because the position changes
        // eslint-disable-next-line prefer-destructuring
        left = parentElement.getBoundingClientRect().left
      }
      const containerRect = this.containerRect || { left: 0, width: 0 }
      const overdoc = left - containerRect.left + pos.width > (containerRect.width || docSize.width)
      if (this.state.overdoc === overdoc) return
      this.ajustdoc = true
      this.setState({
        overdoc,
      })
    }

    handleRef(ref) {
      this.el = ref
    }

    renderList() {
      const {
        parentElement,
        absolute,
        focus,
        rootClass,
        position,
        scrollLeft,
        scrollTop,
        scrollElement,
        style = {},
        zIndex,
        getResetPosition,
        autoAdapt: ignore,
        ...props
      } = this.props
      const parsed = parseInt(zIndex, 10)
      if (!Number.isNaN(parsed)) style.zIndex = parsed
      const mergeStyle = Object.assign({}, style, this.state.overdoc ? { right: 0, left: 'auto' } : undefined)
      return <List getRef={this.handleRef} {...props} focus={focus} style={mergeStyle} />
    }

    render() {
      const { autoAdapt } = this.props
      setTimeout(() => {
        this.resetPosition(autoAdapt)
      })

      if (!this.props.absolute) {
        return this.renderList()
      }
      if (!this.container) return null
      const {
        parentElement,
        rootClass,
        absolute,
        position,
        scrollLeft,
        scrollTop,
        scrollElement,
        autoClass,
        zIndex,
        // do not need the getUpdate
        getResetPosition,
        // do not need the value
        value,
        autoAdapt: ignore,
        ...props
      } = this.props
      const mergeClass = classnames(listClass('absolute-wrapper'), rootClass, autoClass)
      const { focus, style } = props.focus ? this.getStyle() : { style: this.lastStyle }
      this.element.className = mergeClass
      const mergeStyle = Object.assign(
        {},
        style,
        props.style,
        this.state.overdoc ? { right: 0, left: 'auto' } : undefined
      )
      if (zIndex || typeof zIndex === 'number') mergeStyle.zIndex = parseInt(zIndex, 10)
      return ReactDOM.createPortal(
        <List getRef={this.handleRef} {...props} focus={focus} style={mergeStyle} />,
        this.element
      )
    }
  }

  AbsoluteList.propTypes = {
    focus: PropTypes.bool,
    fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // same width with parentElement
    parentElement: PropTypes.object,
    position: PropTypes.string,
    absolute: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    scrollElement: PropTypes.object,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    rootClass: PropTypes.string,
    zIndex: PropTypes.number,
    style: PropTypes.object,
    autoClass: PropTypes.string,
    value: PropTypes.any,
    getResetPosition: PropTypes.func,
    autoAdapt: PropTypes.bool,
  }

  return compose(
    scrollConsumer,
    zIndexConsumer
  )(AbsoluteList)
}
