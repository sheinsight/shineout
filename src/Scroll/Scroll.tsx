import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { banOverScrollX } from '../utils/dom/scrollBehavior'
import { PureComponent } from '../component'
import { getProps, defaultProps } from '../utils/proptypes'
import { getParent } from '../utils/dom/element'
import normalizeWheel from '../utils/dom/normalizeWheel'
import { scrollClass } from './styles'
import Bar from './Bar'
import config from '../config'
import { Provider } from './context'
import { throttleWrapper } from '../utils/lazyload'
import { isRTL } from '../config'

export const BAR_WIDTH = 16

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.touchStartX = 0
    this.touchStartY = 0

    this.wheelX = props.scrollX
    this.wheelY = props.scrollY

    this.pixelX = 0
    this.pixelY = 0

    this.cacheWidth = 0
    this.cacheHeight = 0

    this.bindInner = this.bindInner.bind(this)
    this.bindWheel = this.bindWheel.bind(this)
    this.bindFooter = this.bindFooter.bind(this)
    this.setRect = this.setRect.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.bindIframe = this.bindIframe.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.setStartPoint = this.setStartPoint.bind(this)
    this.handleInnerScroll = this.handleInnerScroll.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    setTimeout(this.setRect)
    this.wheelElement.addEventListener('wheel', this.handleWheel, { passive: false })
    this.wheelElement.addEventListener('touchstart', this.handleTouchStart, { passive: true })
    this.wheelElement.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.inner.addEventListener('scroll', this.handleInnerScroll)
    this.wheelElement.addEventListener('scroll', this.handleInnerScroll)
    this.rmOverScrollListener = banOverScrollX(this.wheelElement)
  }

  componentDidUpdate(prevProps) {
    const { stable, scrollWidth, scrollHeight } = this.props
    if (scrollWidth !== prevProps.scrollWidth) this.setRect()
    else if (stable && scrollHeight !== prevProps.scrollHeight) this.setRect()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.wheelElement.removeEventListener('wheel', this.handleWheel)
    this.wheelElement.removeEventListener('touchstart', this.handleTouchStart)
    this.wheelElement.removeEventListener('touchmove', this.handleTouchMove)
    this.inner.removeEventListener('scroll', this.handleInnerScroll)
    this.wheelElement.removeEventListener('scroll', this.handleInnerScroll)

    if (this.footerElement) {
      this.footerElement.removeEventListener('wheel', this.handleWheel)
      this.footerElement.removeEventListener('touchstart', this.handleTouchStart)
      this.footerElement.removeEventListener('touchmove', this.handleTouchMove)
    }
    if (this.rmOverScrollListener) this.rmOverScrollListener()
  }

  getWheelRect() {
    if (!this.wheelElement) return { width: 0, height: 0 }
    let { width, height } = this.wheelElement.getBoundingClientRect()
    // display none
    if (width === 0 && height === 0) {
      width = this.cacheWidth
      height = this.cacheHeight
    } else {
      this.cacheWidth = width
      this.cacheHeight = height
    }

    const { scrollX, scrollY, style } = this.props
    width = (typeof style.width === 'number' ? style.width : width) - (scrollY ? BAR_WIDTH : 0)
    height = (typeof style.height === 'number' ? style.height : height) - (scrollX ? BAR_WIDTH : 0)
    return { width, height }
  }

  setRect() {
    this.handleScroll(this.props.left, this.props.top)
    this.forceUpdate()
  }

  setBaseScrollHeightRatio(height) {
    if (this.baseScrollRatio) return
    this.baseScrollRatio = 1

    const ratio = config.scrollRatio
    // windows scroll
    if (Math.abs(height) > 10) {
      this.baseScrollRatio = ratio / Math.abs(height)
    }
  }

  setStartPoint(position) {
    this.touchStartX = position.clientX
    this.touchStartY = position.clientY
  }

  bindInner(el) {
    this.inner = el
  }

  bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = throttleWrapper(this.setRect)
    }
  }

  bindWheel(el) {
    this.wheelElement = el
  }

  bindFooter(el) {
    if (this.footerElement) {
      this.footerElement.removeEventListener('wheel', this.handleWheel)
      this.footerElement.removeEventListener('touchstart', this.handleTouchStart)
      this.footerElement.removeEventListener('touchmove', this.handleTouchMove)
    }
    if (el) {
      el.addEventListener('wheel', this.handleWheel, { passive: false })
      el.addEventListener('touchstart', this.handleTouchStart, { passive: true })
      el.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    }
    this.footerElement = el
  }

  boundleScroll() {
    /*
    this.locked = true
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.pixelX !== 0 || this.pixelY !== 0) {
        this.boundleScroll()
      }
    }, 32)
    */

    // lock direction
    if (Math.abs(this.pixelX) > Math.abs(this.pixelY)) {
      this.pixelY = 0
    } else {
      this.pixelX = 0
    }

    const { left, top } = this.props
    const { scrollWidth, scrollHeight } = this.props
    let x = left + this.pixelX / scrollWidth
    if (x < 0) x = 0
    if (x > 1) x = 1
    let y = top + this.pixelY / scrollHeight
    if (y < 0) y = 0
    if (y > 1) y = 1

    if (x !== left || y !== top) {
      this.handleScroll(x, y, this.pixelX, this.pixelY)
    }

    this.pixelX = 0
    this.pixelY = 0
  }

  handleWheel(event) {
    const scrollX = this.wheelX
    const scrollY = this.wheelY
    const { innerScrollAttr } = this.props
    if (!scrollX && !scrollY) return
    if (innerScrollAttr.find(attr => event.target.hasAttribute(attr))) {
      event.stopPropagation()
      return
    }

    const target = getParent(event.target, `.${scrollClass('_')}`)
    let inFooter = false
    if (this.footerElement) {
      inFooter = this.footerElement === event.target || this.footerElement.contains(event.target)
    }

    if (target !== this.wheelElement && !inFooter) return

    const wheel = normalizeWheel(event)
    this.setBaseScrollHeightRatio(wheel.pixelY)
    if (scrollX) this.pixelX = isRTL() ? this.pixelX - wheel.pixelX : this.pixelX + wheel.pixelX
    if (scrollY && !inFooter) this.pixelY += wheel.pixelY * this.baseScrollRatio

    if (Math.abs(wheel.pixelX) > Math.abs(wheel.pixelY)) {
      event.preventDefault()
    } else if (scrollY) event.preventDefault()

    // if (!this.locked) {
    this.boundleScroll()
    // }
  }

  handleScroll(x, y, pixelX, pixelY, { drag } = {}) {
    const { scrollWidth } = this.props
    const { width, height } = this.getWheelRect()
    const max = Math.round((1 - width / scrollWidth) * scrollWidth)
    if (this.props.onScroll) {
      this.props.onScroll(x, y, max, this.inner, width, height, pixelX, pixelY, drag)
    }
  }

  handleScrollX(left) {
    this.handleScroll(left, this.props.top, undefined, 0, { drag: true })
  }

  handleScrollY(top) {
    this.handleScroll(this.props.left, top, undefined, undefined, { drag: true })
  }

  handleTouchStart(e) {
    this.setStartPoint(e.changedTouches[0])
  }

  handleTouchMove(e) {
    const { scrollX, scrollY } = this.props
    e.preventDefault()
    const position = e.changedTouches[0]
    const moveX = position.clientX - this.touchStartX
    const moveY = position.clientY - this.touchStartY

    if (scrollX) this.pixelX = -moveX
    if (scrollY) this.pixelY = -moveY

    // need reset the start
    this.setStartPoint(position)

    this.boundleScroll()
  }

  // handle inner scroll cased by input focus
  handleInnerScroll(e) {
    const { target } = e
    const { left, scrollWidth, top, scrollHeight } = this.props
    const { width, height } = this.getWheelRect()
    if (target.scrollLeft || target.scrollTop) {
      let sLeft = target.scrollLeft ? left + target.scrollLeft / (scrollWidth - width) : left
      let sTop = target.scrollTop ? top + target.scrollTop / (scrollHeight - height) : top
      sTop = Math.min(1, sTop)
      sTop = Math.max(0, sTop)
      sLeft = Math.min(1, sLeft)
      sLeft = Math.max(0, sLeft)
      this.handleScroll(sLeft, sTop, undefined, undefined, { drag: true })
      target.scrollLeft = 0
      target.scrollTop = 0
    }
  }

  render() {
    const { children, scrollWidth, scrollHeight, left, top, scrollX, scrollY, style } = this.props
    const { width, height } = this.getWheelRect()
    const rtl = isRTL()

    const className = classnames(
      scrollClass('_', scrollX && 'show-x', scrollY && 'show-y', rtl && 'rtl'),
      this.props.className
    )

    const yLength = scrollHeight < height ? scrollHeight : height

    this.wheelY = scrollY && Math.ceil(scrollHeight) > Math.ceil(yLength)
    this.wheelX = scrollX && Math.ceil(scrollWidth) > Math.ceil(width)

    return (
      <>
        <div style={style} ref={this.bindWheel} className={className}>
          <iframe tabIndex={-1} title="scroll" ref={this.bindIframe} className={scrollClass('iframe')} />
          <div className={scrollClass('iframe')} />
          <div ref={this.bindInner} className={scrollClass('inner')}>
            <Provider value={{ left: left * width, top: top * height, element: this.wheelElement }}>
              {children}
            </Provider>
          </div>
          {scrollY && (
            <Bar
              direction="y"
              length={yLength}
              forceHeight={scrollHeight < height ? scrollHeight : undefined}
              scrollLength={scrollHeight}
              offset={top}
              onScroll={this.handleScrollY}
            />
          )}
          {scrollX && (
            <Bar direction="x" length={width} scrollLength={scrollWidth} offset={left} onScroll={this.handleScrollX} />
          )}
        </div>
        {this.props.footer && (
          <div ref={this.bindFooter} className={scrollClass('footer')}>
            {this.props.footer}
          </div>
        )}
      </>
    )
  }
}

Scroll.propTypes = {
  ...getProps(PropTypes),
  left: PropTypes.number.isRequired,
  // overLock: PropTypes.bool,
  top: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  scrollHeight: PropTypes.number,
  scrollWidth: PropTypes.number,
  scrollX: PropTypes.bool.isRequired,
  scrollY: PropTypes.bool.isRequired,
  stable: PropTypes.bool,
  footer: PropTypes.node,
  innerScrollAttr: PropTypes.arrayOf(PropTypes.string),
}

Scroll.defaultProps = {
  ...defaultProps,
  // overLock: true,
  scrollHeight: 0,
  scrollWidth: 0,
  innerScrollAttr: [],
}

export default Scroll
