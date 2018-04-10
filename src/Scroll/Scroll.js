import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import normalizeWheel from '../utils/dom/normalizeWheel'
import { scrollClass } from '../styles'
import Bar from './Bar'

const BAR_WIDTH = 12

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.pixelX = 0
    this.pixelY = 0

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
    if (this.props.scrollWidth !== prevProps.scrollWidth
     || this.props.scrollHeight !== prevProps.scrollHeight) {
      this.setRect()
    }
  }

  getWheelRect() {
    if (!this.wheelElement) return { width: 0, height: 0 }
    const rect = this.wheelElement.getBoundingClientRect()
    const { scrollX, scrollY, style } = this.props
    const width = (style.width || rect.width) - (scrollY ? BAR_WIDTH : 0)
    const height = (style.height || rect.height) - (scrollX ? BAR_WIDTH : 0)
    return { width, height }
  }

  setRect() {
    this.handleScroll(this.props.left, this.props.top)
    // this.forceUpdate()
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
    this.locked = true
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.pixelX !== 0 || this.pixelY !== 0) {
        this.boundleScroll()
      }
    }, 16)

    const { left, top } = this.props
    const { scrollWidth, scrollHeight } = this.props
    let x = left + (this.pixelX / scrollWidth)
    if (x < 0) x = 0
    if (x > 1) x = 1
    let y = top + (this.pixelY / scrollHeight)
    if (y < 0) y = 0
    if (y > 1) y = 1

    this.pixelX = 0
    this.pixelY = 0

    if (x !== left || y !== top) {
      this.handleScroll(x, y)
    }
  }

  handleWheel(event) {
    event.preventDefault()
    const wheel = normalizeWheel(event)
    this.pixelX += wheel.pixelX * 3
    this.pixelY += wheel.pixelY * 3

    if (!this.locked) {
      this.boundleScroll()
    }
  }

  handleScroll(x, y) {
    const { scrollWidth } = this.props
    const { width, height } = this.getWheelRect()
    const max = Math.round((1 - (width / scrollWidth)) * scrollWidth)
    if (this.props.onScroll) {
      this.props.onScroll(x, y, max, this.inner, width, height)
    }
  }

  handleScrollX(left) {
    this.handleScroll(left, this.props.top)
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
        <div ref={this.bindInner} className={scrollClass('inner')}>
          { children }
        </div>
        {
          scrollY &&
          <Bar
            direction="y"
            length={height}
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
  ...getProps(),
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  scrollHeight: PropTypes.number,
  scrollWidth: PropTypes.number,
  scrollX: PropTypes.bool.isRequired,
  scrollY: PropTypes.bool.isRequired,
}

Scroll.defaultProps = {
  ...defaultProps,
  scrollHeight: 0,
  scrollWidth: 0,
}

export default Scroll
