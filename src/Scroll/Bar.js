import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { scrollClass } from '../styles'

class ScrollBar extends PureComponent {
  constructor(props) {
    super(props)

    this.bindBar = this.bindBar.bind(this)
    this.handleBarClick = this.handleBarClick.bind(this)
    this.handleBgClick = this.handleBgClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.unbindEvent = this.unbindEvent.bind(this)
  }

  componentWillUnmount() {
    this.unbindEvent()
  }

  bindBar(el) {
    this.bar = el
  }

  bindEvent() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.unbindEvent)
  }

  unbindEvent() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.unbindEvent)
  }

  handleBarClick(event) {
    this.mouseX = event.clientX
    this.mouseY = event.clientY
    this.bindEvent()
  }

  handleMouseMove(event) {
    // event.preventDefault()
    const x = event.clientX - this.mouseX
    const y = event.clientY - this.mouseY
    this.mouseX = event.clientX
    this.mouseY = event.clientY

    const {
      direction, offset, length, onScroll, scrollLength,
    } = this.props
    const value = direction === 'x' ? x : y
    const max = 1 - (length / scrollLength)

    let newOffset = offset + (value / length)
    if (newOffset < 0) newOffset = 0
    if (newOffset > max) newOffset = max

    onScroll(newOffset)
  }

  handleBgClick(event) {
    if (event.target === this.bar) return

    const {
      direction, length, scrollLength, offset, onScroll,
    } = this.props
    const rect = this.bar.getBoundingClientRect()

    let newOffset = offset
    const per = length / scrollLength

    if ((direction === 'x' && event.clientX < rect.left) ||
        (direction === 'y' && event.clientY < rect.top)) {
      newOffset = offset - per
      if (newOffset < 0) newOffset = 0
    } else {
      newOffset = offset + per
      if (newOffset > 1 - per) newOffset = 1 - per
    }

    onScroll(newOffset, newOffset / (1 - per))
  }

  render() {
    const {
      direction, length, scrollLength, offset,
    } = this.props
    const className = scrollClass(
      'bar',
      direction,
      scrollLength > length && 'show',
    )

    const style = {}
    if (scrollLength > 0) {
      if (direction === 'x') {
        style.width = `${(length / scrollLength) * 100}%`
        style.left = `${offset * 100}%`
      } else {
        style.height = `${(length / scrollLength) * 100}%`
        style.top = `${offset * 100}%`
      }
    }

    return (
      <div className={className} onClick={this.handleBgClick}>
        <a
          onMouseDown={this.handleBarClick}
          ref={this.bindBar}
          style={style}
        />
      </div>
    )
  }
}

ScrollBar.propTypes = {
  scrollLength: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['x', 'y']),
  length: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
}

ScrollBar.defaultProps = {
  direction: 'y',
}

export default ScrollBar
