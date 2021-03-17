import React, { Fragment } from 'react'
import PropType from 'prop-types'
import { PureComponent } from '../component'
import Scroll from '../Scroll'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'

class LazyList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      scrollTop: 0,
      fixed: '',
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!this.props.stay && prevProps.data.length !== this.props.data.length) {
      this.resetScrollTop()
    }
  }

  getScrollHeight() {
    const { lineHeight, data } = this.props
    return data.length * lineHeight
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

  handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.optionInner) return
    const scrollHeight = this.getScrollHeight()
    const { data, itemsInView, lineHeight } = this.props
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
    const { className, style, height, lineHeight, data, itemsInView, renderItem, keygen } = this.props
    const { currentIndex, fixed } = this.state
    const scrollHeight = this.getScrollHeight()
    const ms = Object.assign({}, style, height && { height })
    const items = data
      .slice(currentIndex, currentIndex + itemsInView)
      .map((d, i) => <Fragment key={getKey(d, keygen, i)}>{renderItem(d, i)}</Fragment>)
    return (
      <Scroll
        stable
        className={className}
        style={ms}
        scroll={fixed}
        onScroll={this.handleScroll}
        scrollHeight={scrollHeight}
        scrollTop={this.state.scrollTop}
      >
        <div
          ref={el => {
            this.optionInner = el
          }}
        >
          <div style={{ height: currentIndex * lineHeight }} />
          {items}
        </div>
      </Scroll>
    )
  }
}

LazyList.defaultProps = {
  itemsInView: 10,
  lineHeight: 32,
  data: [],
}

LazyList.propTypes = {
  data: PropType.array,
  itemsInView: PropType.number,
  lineHeight: PropType.number,
  height: PropType.oneOfType([PropType.number, PropType.string]),
  renderItem: PropType.func.isRequired,
  stay: PropType.bool,
  className: PropType.string,
  style: PropType.object,
  keygen: PropType.oneOfType([PropType.string, PropType.func, PropType.bool]),
}

export default LazyList
