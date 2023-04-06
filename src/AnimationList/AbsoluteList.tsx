import React, { Component, ComponentType } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import shallowEqual from '../utils/shallowEqual'
import { compose } from '../utils/func'
import { scrollConsumer } from '../Scroll/context'
import { listClass } from './styles'
import { docSize } from '../utils/dom/document'
import { getRTLPosition } from '../utils/strings'
import zIndexConsumer from '../Modal/context'
import { isRTL, getDefaultContainer } from '../config'
import { addZoomListener, removeZoomListener } from '../utils/zoom'
import { isInDocument } from '../utils/dom/isInDocument'
import { AbsoluteProps, GetAbsoluteProps } from './Props'

const PICKER_V_MARGIN = 4
let root: HTMLDivElement
function initRoot() {
  const defaultContainer = getDefaultContainer()
  root = document.createElement('div')
  root.className = listClass('root', isRTL() && 'rtl')
  defaultContainer.appendChild(root)
}

function getRoot() {
  if (!root || isInDocument(root) === false) initRoot()
  return root
}

const getOverDocStyle = (right: boolean) => (right ? { left: 0, right: 'auto' } : { right: 0, left: 'auto' })

const listPosition = ['drop-down', 'drop-up']
const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']
const dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

export default function<U extends {}>(List: ComponentType<U>) {
  class AbsoluteList extends Component<AbsoluteProps> {
    state = {
      overdoc: false,
    }

    lastStyle: React.CSSProperties

    container: HTMLElement

    element: HTMLElement

    ajustdoc: boolean

    containerRect: DOMRect

    containerScroll: { left: number; top: number }

    el: HTMLElement

    constructor(props: AbsoluteProps) {
      super(props)
      this.handleRef = this.handleRef.bind(this)
      if (!props.absolute) return
      this.lastStyle = {}

      if (!root) initRoot()
      this.container = typeof this.props.absolute === 'function' ? this.props.absolute() : getRoot()
      this.element = document.createElement('div')
      if (this.container) this.container.appendChild(this.element)
      if (props.getResetPosition) {
        props.getResetPosition(this.resetPosition.bind(this))
      }
      this.zoomChangeHandler = this.zoomChangeHandler.bind(this)
    }

    componentDidMount() {
      if (this.props.absolute && !this.container) {
        this.container = typeof this.props.absolute === 'function' ? this.props.absolute() : getRoot()
        this.container.appendChild(this.element)
        if (this.props.focus) {
          this.forceUpdate()
        }
      }
      if (this.props.absolute) {
        addZoomListener(this.zoomChangeHandler)
      }
    }

    componentDidUpdate(prevProps: AbsoluteProps) {
      if (!this.props.focus) this.ajustdoc = false
      if (shallowEqual(prevProps.value, this.props.value)) return
      setTimeout(() => {
        this.forceUpdate()
      })
    }

    componentWillUnmount() {
      const { absolute } = this.props
      if (!absolute) return
      removeZoomListener(this.zoomChangeHandler)
      if (this.container) {
        if (this.element && this.element.parentNode) this.element.parentNode.removeChild(this.element)
      }
    }

    getPosition(rect: DOMRect) {
      const { fixed } = this.props
      let { position } = this.props as { position: string }
      const rtl = isRTL()
      const style: React.CSSProperties = {
        position: 'absolute',
        right: 'auto',
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

      const { container } = this
      const defaultContainer = getDefaultContainer()
      const rootContainer = container === getRoot() || !container ? defaultContainer : container
      const containerRect = rootContainer.getBoundingClientRect()
      const containerScroll = {
        left: rootContainer.scrollLeft,
        top: rootContainer.scrollTop,
      }
      this.containerRect = containerRect
      this.containerScroll = containerScroll

      if (listPosition.includes(position)) {
        style.left = rect.left - containerRect.left + containerScroll.left
        if (isRTL()) {
          style.right = containerRect.width - rect.width - style.left
          style.left = 'auto'
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
          style.right = containerRect.width - rect.width - rect.left + containerRect.left - containerScroll.left
          style.left = 'auto'
        }
        if (v === 'bottom') {
          style.top = rect.bottom - containerRect.top + containerScroll.top + PICKER_V_MARGIN
        } else {
          style.top = rect.top - containerRect.top + containerScroll.top - PICKER_V_MARGIN
          style.transform = 'translateY(-100%)'
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
        const scrollRect: any = scrollElement ? scrollElement.getBoundingClientRect() : {}

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

    zoomChangeHandler() {
      if (this.props.focus) {
        this.forceUpdate()
      }
    }

    isRight() {
      const { position } = this.props
      let isRight = false
      if (position && position.indexOf('right') > 1) {
        isRight = true
      }
      if (isRTL()) {
        isRight = !isRight
      }
      return isRight
    }

    resetPosition(clean?: boolean) {
      const { focus, parentElement } = this.props
      if (!this.el || !focus || (this.ajustdoc && !clean)) return
      const width = this.el.offsetWidth
      const pos = (parentElement && parentElement.getBoundingClientRect()) || { left: 0, right: 0 }
      const containerRect = this.containerRect || { left: 0, width: 0 }
      const containerScroll = this.containerScroll || { left: 0 }
      let overdoc
      if (this.isRight()) {
        if (isRTL() && containerScroll.left) {
          // this condition  the style left: 0 will not meet expect so not set overdoc
          overdoc = false
        } else {
          overdoc = pos.right - width < containerRect.left
        }
      } else if (!isRTL() && containerScroll.left) {
        // this condition  the style right: 0 will not meet expect so not set overdoc
        overdoc = false
      } else {
        overdoc = pos.left - containerRect.left + width + containerScroll.left > (containerRect.width || docSize.width)
      }
      if (this.state.overdoc === overdoc) return
      this.ajustdoc = true
      this.setState({
        overdoc,
      })
    }

    handleRef(ref: HTMLElement) {
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
      if (zIndex !== undefined) {
        const parsed = parseInt((zIndex as unknown) as string, 10)
        if (!Number.isNaN(parsed)) style.zIndex = parsed
      }

      const mergeStyle = Object.assign({}, style, this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined)
      return <List getRef={this.handleRef} {...props as U} focus={focus} style={mergeStyle} />
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
      const { focus, style } = props.focus ? this.getStyle() : { style: this.lastStyle, focus: undefined }
      this.element.className = mergeClass
      const mergeStyle = Object.assign(
        {},
        style,
        props.style,
        this.state.overdoc ? getOverDocStyle(this.isRight()) : undefined
      )
      if (zIndex || typeof zIndex === 'number') mergeStyle.zIndex = parseInt((zIndex as unknown) as string, 10)
      return ReactDOM.createPortal(
        <List getRef={this.handleRef} {...props as U} focus={focus} style={mergeStyle} />,
        this.element
      )
    }
  }

  return compose(
    scrollConsumer,
    zIndexConsumer
  )(AbsoluteList) as ComponentType<GetAbsoluteProps<U>>
}
