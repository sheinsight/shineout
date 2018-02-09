import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import normalizeWheel from '../utils/dom/normalizeWheel'
import { scrollClass } from '../styles'
import Bar from './Bar'

class Scroll extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    }

    this.pixelX = 0
    this.pixelY = 0

    this.bindContainer = this.bindContainer.bind(this)
    this.setRect = this.setRect.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
  }

  setRect(key, value) {
    this.setState({ [key]: value }, () => {
      if (this.state.width > 0 && this.state.height > 0) {
        this.handleScroll(0, 0)
      }
    })
  }

  boundleScroll() {
    this.locked = true
    this.scrollTimer = setTimeout(() => {
      this.locked = false
      if (this.pixelX !== 0 || this.pixelY !== 0) {
        this.boundleScroll()
      }
    }, 100)

    const { left, top } = this.state
    const { scrollWidth, scrollHeight } = this.props
    let x = left + (this.pixelX / scrollWidth)
    if (x < 0) x = 0
    if (x > 1) x = 1
    let y = top + (this.pixelY / scrollHeight)
    if (y < 0) y = 0
    if (y > 1) y = 1

    this.pixelX = 0
    this.pixelY = 0

    if (x !== this.state.left || y !== this.state.y) {
      this.setState({ left: x, top: y })
      this.handleScroll(x, y)
    }
  }

  handleWheel(event) {
    event.preventDefault()
    const wheel = normalizeWheel(event)
    this.pixelX += wheel.pixelX
    this.pixelY += wheel.pixelY

    if (!this.locked) {
      this.boundleScroll()
    }
  }

  handleScroll(x, y) {
    const { scrollWidth, scrollHeight } = this.props
    const { width, height } = this.state
    const left = Math.round(x * (scrollWidth - width))
    const top = Math.round(y * (scrollHeight - height))
    const max = Math.round((1 - (width / scrollWidth)) * scrollWidth)
    if (this.props.onScroll) {
      this.props.onScroll(left, top, max)
    }
  }

  handleScrollX(left) {
    this.setState({ left })
    this.handleScroll(left, this.state.top)
  }

  handleScrollY(top) {
    this.setState({ top })
    this.handleScroll(this.state.left, top)
  }

  bindContainer(el) {
    this.element = el
  }

  render() {
    const { children, scrollWidth, scrollHeight } = this.props
    const { left, top } = this.state

    const className = classnames(
      scrollClass('_'),
      this.props.className,
    )

    return (
      <div ref={this.bindContainer} onWheel={this.handleWheel} className={className}>
        { children }
        <Bar
          setRect={this.setRect}
          scrollLength={scrollHeight}
          offset={top}
          onScroll={this.handleScrollY}
        />
        <Bar
          direction="x"
          setRect={this.setRect}
          scrollLength={scrollWidth}
          offset={left}
          onScroll={this.handleScrollX}
        />
      </div>
    )
  }
}

Scroll.propTypes = {
  ...getProps(),
  onScroll: PropTypes.func,
  scrollHeight: PropTypes.number,
  scrollWidth: PropTypes.number,
}

Scroll.defaultProps = {
  ...defaultProps,
  scrollHeight: 0,
  scrollWidth: 0,
}

export default Scroll
