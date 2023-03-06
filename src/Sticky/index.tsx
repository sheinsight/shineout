import React from 'react'
import { PureComponent } from '../component'
import { getParent } from '../utils/dom/element'
import { eventPassive } from '../utils/dom/detect'
import { defaultProps } from '../utils/defaultProps'
import { compose } from '../utils/func'
import { cssSupport, copyBoundingClientRect } from '../utils/dom/element'
import { docSize } from '../utils/dom/document'
import { consumer } from './context'
import { StickyProps, Mode, StickyType } from './Props'

const events = ['scroll', 'pageshow', 'load']
const supportSticky = cssSupport('position', 'sticky')
const DefaultValue = {
  ...defaultProps,
  css: true,
}

interface StickyState {
  mode?: Mode
  scrollWidth?: number
  placeholder?: React.CSSProperties
  style?: React.CSSProperties
}

class Sticky extends PureComponent<StickyProps, StickyState> {
  static displayName = 'ShineoutSticky'

  static defaultProps = DefaultValue

  style: React.CSSProperties

  targetElement: Element | null

  element: HTMLDivElement

  scrollTimer: NodeJS.Timer

  placeholder: HTMLDivElement

  origin: HTMLDivElement

  locked: boolean

  scrollCount: number

  constructor(props: StickyProps) {
    super(props)

    this.state = {}

    this.bindElement = this.bindElement.bind(this)
    this.bindOrigin = this.bindOrigin.bind(this)
    this.bindPlaceholder = this.bindPlaceholder.bind(this)
    this.handlePosition = this.handlePosition.bind(this)
    this.style = {}
  }

  componentDidMount() {
    super.componentDidMount()
    const { target } = this.props
    this.targetElement = getParent(this.element, target)
    this.handlePosition()
    this.bindScroll()
  }

  componentDidUpdate(prevProps: StickyProps) {
    if (!prevProps.needResetPostion && this.props.needResetPostion) {
      this.setPosition()
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.unbindScroll()
    if (this.scrollTimer) clearTimeout(this.scrollTimer)
  }

  getStyle(mode: Mode, offset: number, left?: number, width?: number) {
    const { zIndex = 900 } = this.props.style!
    const { css } = this.props

    const style: React.CSSProperties = {
      position: 'fixed',
      left,
      width,
      [mode]: offset,
      zIndex,
    }
    if (this.targetElement) {
      if (supportSticky && css) {
        style.position = 'sticky'
      } else {
        style.position = 'absolute'
        if (mode === 'top') {
          style.transform = `translateY(${offset + this.targetElement.scrollTop}px)`
        } else {
          style.transform = `translateY(${this.targetElement.scrollTop}px)`
        }
        delete style.left
      }
    }

    this.triggerChange(true, style)

    return style
  }

  setPosition() {
    const { bottom, top, target, css, needResetPostion } = this.props
    const { mode, scrollWidth } = this.state
    // If it is a hidden element, the position will not be updated
    if (needResetPostion === false) return

    const selfRect = copyBoundingClientRect(this.element)

    if (selfRect === null) return
    // If the element is hidden, the width and height will be 0
    if (selfRect && selfRect.width === 0 && selfRect.height === 0) return

    const { marginBottom, marginTop } = getComputedStyle(this.element)
    selfRect.height += parseFloat(marginBottom) + parseFloat(marginTop)
    const scrollElement = this.targetElement || document.body
    const scrollRect = scrollElement.getBoundingClientRect()

    const placeholderRect = this.placeholder ? copyBoundingClientRect(this.placeholder) : null
    const viewHeight = docSize.height

    if (this.origin) {
      const { width } = this.origin.getBoundingClientRect()
      selfRect.width = width
      if (placeholderRect) placeholderRect.width = width
    }

    const placeholderStyle = {
      width: selfRect.width,
      // if target element is not null, set height to 0
      height: target && supportSticky && css ? 0 : selfRect.height,
    }

    let style
    let placeholder

    if (top !== undefined && mode !== 'bottom') {
      let limitTop = top
      if (this.targetElement) {
        const { paddingTop } = getComputedStyle(scrollElement)
        limitTop += scrollRect.top + parseInt(paddingTop, 10)
      }
      if (Math.ceil(selfRect.top) < limitTop) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (placeholderRect && selfRect.top < placeholderRect.top) {
        if (scrollRect.width !== selfRect.width) {
          style = this.getStyle('top', top, selfRect.left, scrollRect.width)
        }
        if (!(target && selfRect.top === limitTop)) {
          this.setState({ mode: '' })
          style = {}
          placeholder = null
          this.triggerChange(false, style)
        }
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('top', top, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'top' })
        style = this.getStyle('top', top, placeholderRect.left, placeholderRect.width)
        placeholder = placeholderStyle
      }
    }

    if (bottom !== undefined && mode !== 'top') {
      let limitBottom = viewHeight - bottom

      if (this.targetElement) {
        const { paddingBottom } = getComputedStyle(scrollElement)
        limitBottom = scrollRect.bottom - bottom! - parseInt(paddingBottom, 10)
      }

      if (selfRect.bottom > limitBottom) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (
        placeholderRect &&
        (this.targetElement ? scrollRect.bottom : selfRect.bottom) > placeholderRect.bottom
      ) {
        if (scrollRect.width !== selfRect.width) {
          style = this.getStyle('bottom', bottom, selfRect.left, scrollRect.width)
        }
        if (!(target && selfRect.bottom === limitBottom)) {
          this.setState({ mode: '' })
          style = {}
          placeholder = null
          this.triggerChange(false, style)
        }
      } else if (this.targetElement && placeholderRect) {
        style = this.getStyle('bottom', bottom, selfRect.left, selfRect.width)
        placeholder = placeholderStyle
      } else if (scrollWidth && placeholderRect && scrollWidth !== scrollRect.width) {
        this.setState({ scrollWidth: scrollRect.width, mode: 'bottom' })
        style = this.getStyle('bottom', bottom, placeholderRect.left, placeholderRect.width)
        placeholder = placeholderStyle
      }
    }

    if (placeholder !== undefined) {
      this.setState({ placeholder })
    }
    if (style) {
      this.style = style as React.CSSProperties
      this.setState({ style })
    }
  }

  triggerChange(flag: boolean, style: React.CSSProperties) {
    const { onChange } = this.props
    if (style.position === this.style.position) return
    if (typeof onChange === 'function') onChange(flag)
  }

  handlePosition() {
    const { css } = this.props
    if (this.locked && css) {
      this.scrollCount += 1
      return
    }

    this.locked = true
    this.scrollCount = 0

    this.setPosition()
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.scrollCount > 0) {
        this.handlePosition()
      }
    }, 48)
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  bindOrigin(el: HTMLDivElement) {
    this.origin = el
  }

  bindPlaceholder(el: HTMLDivElement) {
    this.placeholder = el
  }

  bindScroll() {
    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handlePosition, eventPassive)
    } else {
      events.forEach(e => {
        window.addEventListener(e, this.handlePosition)
      })
    }
    window.addEventListener('resize', this.handlePosition)
  }

  unbindScroll() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handlePosition)
    } else {
      events.forEach(e => {
        window.removeEventListener(e, this.handlePosition)
      })
    }
    window.removeEventListener('resize', this.handlePosition)
  }

  render() {
    const { children, className, target, css } = this.props
    const { placeholder } = this.state

    let outerStyle = this.props.style
    let innerStyle = this.state.style
    if (target && supportSticky && css) {
      outerStyle = Object.assign({}, outerStyle, innerStyle)
      innerStyle = {}
    }

    return (
      <div style={outerStyle} className={className}>
        <div ref={this.bindElement} style={Object.assign({}, innerStyle, { display: 'flow-root' })}>
          {children}
        </div>
        <div ref={this.bindOrigin} />
        {placeholder && <div ref={this.bindPlaceholder} style={placeholder} />}
      </div>
    )
  }
}

export default compose(consumer)(Sticky) as StickyType
