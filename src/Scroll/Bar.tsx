import React, { CSSProperties, PureComponent } from 'react'
import classnames from 'classnames'
import { scrollClass } from './styles'
import fixedLength from './fixedLength'
import { isRTL } from '../config'
import { BarProps } from './Props'

interface BarState {
  dragging: boolean
}

class ScrollBar extends PureComponent<BarProps, BarState> {
  static defaultProps = {
    direction: 'y',
  } as any

  handle: HTMLElement

  cacheOffset: number

  mouseX: number

  mouseY: number

  constructor(props: BarProps) {
    super(props)

    this.state = {
      dragging: false,
    }

    this.bindHandle = this.bindHandle.bind(this)
    this.handleBarClick = this.handleBarClick.bind(this)
    this.handleBgClick = this.handleBgClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.unbindEvent = this.unbindEvent.bind(this)
  }

  componentWillUnmount() {
    this.unbindEvent()
  }

  toggleClassList(method: 'remove' | 'add') {
    if (this.handle && this.handle.parentNode && this.handle.parentNode.parentNode) {
      const { classList } = this.handle.parentNode.parentNode as HTMLElement
      if (classList) {
        classList[method](scrollClass('dragging'))
      }
    }
  }

  bindHandle(el: HTMLDivElement) {
    this.handle = el
  }

  bindEvent() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.unbindEvent)
  }

  unbindEvent() {
    this.setState({ dragging: false })
    this.toggleClassList('remove')
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.unbindEvent)
  }

  handleBarClick(event: React.MouseEvent<HTMLDivElement>) {
    const { offset } = this.props
    this.cacheOffset = offset
    this.setState({ dragging: true })
    this.mouseX = event.clientX
    this.mouseY = event.clientY
    this.toggleClassList('add')
    this.bindEvent()
  }

  handleMouseMove(event: MouseEvent) {
    const x = event.clientX - this.mouseX
    const y = event.clientY - this.mouseY
    this.mouseX = event.clientX
    this.mouseY = event.clientY

    const { direction, length, onScroll, barLength } = this.props
    const value = direction === 'x' ? x : y
    let newOffset
    if (direction === 'x' && isRTL()) {
      newOffset = this.cacheOffset - value / (length - barLength)
    } else {
      newOffset = this.cacheOffset + value / (length - barLength)
    }

    if (newOffset < 0) newOffset = 0
    if (newOffset > 1) newOffset = 1
    if (newOffset === this.cacheOffset) return
    this.cacheOffset = newOffset
    onScroll(newOffset)
  }

  handleBgClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === this.handle) return

    const { direction, length, scrollLength, offset, onScroll } = this.props
    const rect = this.handle.getBoundingClientRect()

    let newOffset = offset
    const page = length / (scrollLength - length)
    const plus = isRTL() ? event.clientX < rect.left : event.clientX > rect.left
    const add = isRTL() ? event.clientX > rect.left : event.clientX < rect.left
    if ((direction === 'x' && add) || (direction === 'y' && event.clientY < rect.top)) {
      newOffset = offset - page
      if (newOffset < 0) newOffset = 0
    } else if ((direction === 'x' && plus) || (direction === 'y' && event.clientY > rect.top)) {
      newOffset = offset + page
      if (newOffset > 1) newOffset = 1
    }

    onScroll(newOffset)
  }

  render() {
    const { direction, length, scrollLength, offset, barLength, forceHeight } = this.props
    const { dragging } = this.state
    const show = scrollLength > length
    const rtl = isRTL()
    const className = classnames(
      scrollClass('bar', direction, show && 'show', dragging && 'dragging', !forceHeight && 'padding-y'),
      this.props.className
    )

    const value = (length - barLength) * offset
    const x = rtl ? 'right' : 'left'
    const style: CSSProperties = {}
    if (scrollLength > 0) {
      if (direction === 'x') {
        style.width = `${(length / scrollLength) * 100}%`
        style[x] = value
      } else {
        style.height = `${(length / scrollLength) * 100}%`
        style.top = value
      }
    }

    return (
      <div className={className} style={{ height: forceHeight }} onMouseDown={show ? this.handleBgClick : undefined}>
        <div className={scrollClass('handle')} onMouseDown={this.handleBarClick} ref={this.bindHandle} style={style} />
      </div>
    )
  }
}

export default fixedLength(ScrollBar)
