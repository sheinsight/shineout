import React from 'react'
import PropType from 'prop-types'
import { PureComponent } from '../component'
import Scroll from '../Scroll'
import { setTranslate } from '../utils/dom/translate'

class LazyList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      scrollTop: 0,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length !== this.props.data.length && !this.props.stay) {
      this.setState({
        currentIndex: 0,
        scrollTop: 0,
      })
    }
  }

  handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.optionInner) return
    const { data, itemsInView, lineHeight, scrollHeight } = this.props
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

    this.setState({ scrollTop, currentIndex: index })
  }

  render() {
    const { scrollHeight, height, lineHeight, data, itemsInView, renderItem } = this.props
    const { currentIndex } = this.state
    let scroll = ''
    if (height < scrollHeight) {
      scroll = 'y'
    }
    const items = data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => renderItem(d, i))
    if (items.length === 0) return null
    return (
      <Scroll
        stable
        scroll={scroll}
        style={{ height: scroll ? height : undefined }}
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
  scrollHeight: PropType.number.isRequired,
  data: PropType.array,
  itemsInView: PropType.number,
  lineHeight: PropType.number,
  height: PropType.number.isRequired,
  renderItem: PropType.func.isRequired,
  stay: PropType.bool,
}

export default LazyList
