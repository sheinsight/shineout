import React, { Fragment } from 'react'
import { PureComponent } from '../component'
import Scroll from '../Scroll'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import { lazyListProps } from './Props'
import { ScrollFixedType } from '../Scroll/Props'

interface LazyListState {
  currentIndex: number
  scrollTop: number
  fixed: ScrollFixedType | ''
}
const DefaultProps = {
  itemsInView: 10,
  lineHeight: 32,
  data: [],
  colNum: 1,
}

class LazyList<DataItem> extends PureComponent<lazyListProps<DataItem>, LazyListState> {
  static defaultProps = DefaultProps

  optionInner: HTMLDivElement

  lastScrollTop: number

  constructor(props: lazyListProps<DataItem>) {
    super(props)

    this.state = {
      currentIndex: 0,
      scrollTop: 0,
      fixed: '',
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidUpdate(prevProps: lazyListProps<DataItem>) {
    if (!this.props.stay && prevProps.data.length !== this.props.data.length) {
      this.resetScrollTop()
    }
  }

  getScrollHeight() {
    const { lineHeight = DefaultProps.lineHeight, data, colNum = DefaultProps.colNum } = this.props
    const rows = Math.ceil(data.length / colNum)
    return rows * lineHeight
  }

  resetScrollTop() {
    this.setState({
      currentIndex: 0,
      scrollTop: 0,
    })
    setTranslate(this.optionInner, '0px', `0px`)
    this.optionInner.style.marginTop = `0px`
    this.lastScrollTop = 0
  }

  handleScroll(
    _x: number,
    y: number,
    _max: number,
    _bar: HTMLElement,
    _v: number,
    h: number,
    _pixelX?: number,
    pixelY?: number
  ) {
    if (!this.optionInner) return
    const scrollHeight = this.getScrollHeight()
    const { data, itemsInView = DefaultProps.itemsInView, lineHeight = DefaultProps.lineHeight } = this.props
    const fullHeight = itemsInView * lineHeight
    const contentHeight = scrollHeight - h
    let scrollTop = h > fullHeight ? 0 : y

    this.optionInner.style.marginTop = `${scrollTop * h}px`

    if (pixelY === undefined || pixelY === 0) {
      this.lastScrollTop = scrollTop * contentHeight
    } else {
      this.lastScrollTop += pixelY
      if (this.lastScrollTop < 0) this.lastScrollTop = 0

      // scroll over bottom
      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight
      scrollTop = this.lastScrollTop / contentHeight
      this.optionInner.style.marginTop = `${scrollTop * h}px`
    }

    let index = Math.floor(this.lastScrollTop / lineHeight) - 1
    if (data.length - itemsInView < index) index = data.length - itemsInView
    if (index < 0) index = 0

    setTranslate(this.optionInner, '0px', `-${this.lastScrollTop + scrollTop * h}px`)

    this.setState({ scrollTop, currentIndex: index, fixed: h < this.getScrollHeight() ? 'y' : '' })
  }

  render() {
    const {
      className,
      style,
      height,
      lineHeight = DefaultProps.lineHeight,
      data,
      itemsInView = DefaultProps.itemsInView,
      renderItem,
      keygen,
      colNum = DefaultProps.colNum,
    } = this.props
    const { currentIndex, fixed } = this.state
    const scrollHeight = this.getScrollHeight()
    const ms = Object.assign({}, style, height && { height })
    const items = data
      .slice(currentIndex * colNum, (currentIndex + itemsInView) * colNum)
      .map((d, i) => <Fragment key={getKey(d, keygen, i)}>{renderItem(d, i)}</Fragment>)
    const fr = Array(colNum)
      .fill('1fr')
      .join(' ')
    const gridStyle = colNum > 1 ? { display: 'grid', gridTemplateColumns: fr } : {}
    return (
      <Scroll
        stable
        className={className}
        style={ms}
        scroll={fixed as ScrollFixedType}
        onScroll={this.handleScroll}
        scrollHeight={scrollHeight}
        scrollTop={this.state.scrollTop}
      >
        <div
          ref={el => {
            this.optionInner = el!
          }}
          style={gridStyle}
        >
          <div style={{ height: currentIndex * lineHeight, gridColumnEnd: '-1' }} />
          {items}
        </div>
      </Scroll>
    )
  }
}

export default LazyList
