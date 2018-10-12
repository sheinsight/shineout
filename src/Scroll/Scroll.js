import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { getParent } from '../utils/dom/element'
import normalizeWheel from '../utils/dom/normalizeWheel'
import { scrollClass } from '../styles'
import Bar from './Bar'
import { Provider } from './context'

const BAR_WIDTH = 12

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.pixelX = 0
    this.pixelY = 0

    this.cacheWidth = 0
    this.cacheHeight = 0

    this.bindInner = this.bindInner.bind(this)
    this.bindWheel = this.bindWheel.bind(this)
    this.setRect = this.setRect.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.bindIframe = this.bindIframe.bind(this)
  }

  componentDidMount() {
    setTimeout(this.setRect)
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollWidth !== prevProps.scrollWidth) {
      this.setRect()
    }
  }

  componentWillUnmount() {
    this.$willUnmount = true
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
    width = (style.width || width) - (scrollY ? BAR_WIDTH : 0)
    height = (style.height || height) - (scrollX ? BAR_WIDTH : 0)
    return { width, height }
  }

  setRect() {
    if (this.$willUnmount) return
    this.handleScroll(this.props.left, this.props.top)
    this.forceUpdate()
  }

  setBaseScrollHeightRatio(height) {
    if (this.baseScrollRatio) return
    this.baseScrollRatio = 1

    // windows scroll
    if (Math.abs(height) > 10) {
      this.baseScrollRatio = 60 / Math.abs(height)
    }
  }

  bindInner(el) {
    this.inner = el
  }

  bindIframe(el) {
    if (el && el.contentWindow) {
      el.contentWindow.onresize = this.setRect
    }
  }

  bindWheel(el) {
    this.wheelElement = el
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
    let x = left + (this.pixelX / scrollWidth)
    if (x < 0) x = 0
    if (x > 1) x = 1
    let y = top + (this.pixelY / scrollHeight)
    if (y < 0) y = 0
    if (y > 1) y = 1

    if (x !== left || y !== top) {
      this.handleScroll(x, y, this.pixelX, this.pixelY)
    }

    this.pixelX = 0
    this.pixelY = 0
  }

  handleWheel(event) {
    const { scrollX, scrollY } = this.props
    if (!scrollX && !scrollY) return

    const target = getParent(event.target, `.${scrollClass('_')}`)
    if (target !== this.wheelElement) return

    const wheel = normalizeWheel(event)
    this.setBaseScrollHeightRatio(wheel.pixelY)

    if (scrollX) this.pixelX += wheel.pixelX
    if (scrollY) this.pixelY += wheel.pixelY * this.baseScrollRatio

    if (Math.abs(wheel.pixelX) > Math.abs(wheel.pixelY)) {
      event.preventDefault()
    } else if (scrollY) event.preventDefault()

    // if (!this.locked) {
    this.boundleScroll()
    // }
  }

  handleScroll(x, y, pixelX, pixelY) {
    const { scrollWidth } = this.props
    const { width, height } = this.getWheelRect()
    const max = Math.round((1 - (width / scrollWidth)) * scrollWidth)
    if (this.props.onScroll) {
      this.props.onScroll(x, y, max, this.inner, width, height, pixelX, pixelY)
    }
  }

  handleScrollX(left) {
    this.handleScroll(left, this.props.top, undefined, 0)
  }

  handleScrollY(top) {
    this.handleScroll(this.props.left, top)
  }

  render() {
    const {
      children, scrollWidth, scrollHeight, left, top, scrollX, scrollY, style,
    } = this.props
    const { width, height } = this.getWheelRect()

    const className = classnames(
      scrollClass(
        '_',
        scrollX && 'show-x',
        scrollY && 'show-y',
      ),
      this.props.className,
    )

    return (
      <div onWheel={this.handleWheel} style={style} ref={this.bindWheel} className={className}>
        <iframe title="scroll" ref={this.bindIframe} className={scrollClass('iframe')} />
        <div className={scrollClass('iframe')} />
        <div ref={this.bindInner} className={scrollClass('inner')}>
          <Provider value={{ left: left * width, top: top * height, element: this.wheelElement }}>
            { children }
          </Provider>
        </div>
        {
          scrollY &&
          <Bar
            direction="y"
            length={scrollHeight < height ? scrollHeight : height}
            forceHeight={scrollHeight < height ? scrollHeight : undefined}
            scrollLength={scrollHeight}
            offset={top}
            onScroll={this.handleScrollY}
          />
        }
        {
          scrollX &&
          <Bar
            direction="x"
            length={width}
            scrollLength={scrollWidth}
            offset={left}
            onScroll={this.handleScrollX}
          />
        }
      </div>
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
}

Scroll.defaultProps = {
  ...defaultProps,
  // overLock: true,
  scrollHeight: 0,
  scrollWidth: 0,
}

export default Scroll
