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
      left: props.left || 0,
      top: props.top || 0,
      width: 0,
      height: 0,
    }

    this.pixelX = 0
    this.pixelY = 0

    this.bindInner = this.bindInner.bind(this)
    this.bindHorizontalBar = this.bindHorizontalBar.bind(this)
    this.bindVerticalBar = this.bindVerticalBar.bind(this)
    this.setRect = this.setRect.bind(this)
    this.handleScrollX = this.handleScrollX.bind(this)
    this.handleScrollY = this.handleScrollY.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
  }

  componentDidMount() {
    setTimeout(this.setRect)
    window.addEventListener('resize', this.setRect)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setRect)
  }

  setRect() {
    this.setState({
      width: this.horizontalBar.offsetWidth,
      height: this.verticalBar.offsetHeight,
    })
    this.handleScroll(this.state.left, this.state.top)
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
    const { scrollWidth } = this.props
    const { width } = this.state
    const max = Math.round((1 - (width / scrollWidth)) * scrollWidth)
    if (this.props.onScroll) {
      this.props.onScroll(
        x, y, max, this.inner,
        this.verticalBar.offsetHeight, this.horizontalBar.offsetWidth,
      )
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

  bindInner(el) {
    this.inner = el
  }

  bindHorizontalBar(bar) {
    this.horizontalBar = bar
  }

  bindVerticalBar(bar) {
    this.verticalBar = bar
  }

  render() {
    const { children, scrollWidth, scrollHeight } = this.props
    const {
      left, top, width, height,
    } = this.state

    const className = classnames(
      scrollClass('_'),
      this.props.className,
    )

    return (
      <div onWheel={this.handleWheel} className={className}>
        <div ref={this.bindInner} className={scrollClass('inner')}>
          { children }
        </div>
        <Bar
          bindBar={this.bindVerticalBar}
          direction="y"
          length={height}
          scrollLength={scrollHeight}
          offset={top}
          onScroll={this.handleScrollY}
        />
        <Bar
          bindBar={this.bindHorizontalBar}
          direction="x"
          length={width}
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
  left: PropTypes.number,
  top: PropTypes.number,
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
