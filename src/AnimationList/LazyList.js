import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import Scroll from '../Scroll'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import { getParent } from '../utils/dom/element'
import { isNumber } from '../utils/is'
import { BAR_WIDTH } from '../Scroll/Scroll'

class LazyList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      scrollLeft: 0,
      scrollTop: 0,
      floatFixed: true,
    }

    this.bindTbody = this.bindElement.bind(this, 'tbody')
    this.bindRealTbody = this.bindElement.bind(this, 'realTbody')
    this.setRowHeight = this.setRowHeight.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.cachedRowHeight = []
    this.lastScrollArgs = {}
    this.lastScrollTop = 0

    if (props.tableRef) props.tableRef(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.adjustScrollLeft()
  }

  // reset scrollTop when data changed
  componentDidUpdate() {
    if (!this.tbody) return
    this.updateScrollLeft()
  }

  getIndex(scrollTop = this.state.scrollTop) {
    const { data, itemsInView } = this.props
    const max = data.length
    const mcf = scrollTop > 0.5 ? Math.ceil : Math.floor
    let index = mcf(scrollTop * max - itemsInView * scrollTop)
    if (index > max - itemsInView) index = max - itemsInView
    if (index < 0) index = 0
    return index
  }

  getContentHeight() {
    if (!this.props.data) return 0
    return this.getSumHeight(0, this.props.data.length)
  }

  getContentWidth() {
    if (this.props.width) return this.props.width
    if (this.tbody) return this.tbody.offsetWidth
    return 0
  }

  getSumHeight(start, end) {
    const { lineHeight } = this.props
    let height = 0
    for (let i = start; i < end; i++) {
      height += this.cachedRowHeight[i] || lineHeight
    }
    return height
  }

  getLastRowHeight(index) {
    const { lineHeight, data, itemsInView } = this.props

    if (index + itemsInView >= data.length) return 0

    let lastRowHeight = 0
    if (index >= 1 && index < data.length / 2) {
      lastRowHeight = this.cachedRowHeight[index - 1] || lineHeight
    }
    return lastRowHeight
  }

  setRowHeight(height, index, expand) {
    const oldHeight = this.cachedRowHeight[index]
    this.cachedRowHeight[index] = height
    if (!this.renderByExpand && expand) {
      this.renderByExpand = true
    }
    if (!this.tbody) return

    const { offsetLeft, currentIndex } = this.state
    if (currentIndex === index && !oldHeight) {
      this.lastScrollTop += height - this.props.lineHeight
      setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
    }

    const contentHeight = this.getContentHeight()

    if (oldHeight && height !== oldHeight) {
      if (this.lastScrollTop > contentHeight) {
        this.handleScroll(
          ...immer(this.lastScrollArgs, draft => {
            draft[7] = 1
          })
        )
        return
      }

      const scrollTop = this.lastScrollTop / contentHeight
      this.setState({ scrollTop })
      if (scrollTop === this.state.scrollTop) {
        this.forceUpdate()
      }
    }

    /**
     * if press and hold bar to scroll to the bottom, reset scroll
     */
    if (this.lastScrollArgs[1] === 1) {
      setTimeout(() => {
        this.handleScroll(
          ...immer(this.lastScrollArgs, draft => {
            draft[7] = undefined
          })
        )
      })
    }
  }

  checkScrollToIndex(index, outerHeight) {
    const { data, itemsInView } = this.props
    const max = data.length
    if (max - index >= itemsInView) {
      return index
    }
    const contentHeight = this.getSumHeight(index, max)
    if (contentHeight >= outerHeight) {
      return index
    }
    return max
  }

  updateScrollLeft() {
    let { scrollLeft } = this.props
    this.resetFloatFixed()
    if (!isNumber(scrollLeft)) return
    const args = Array.isArray(this.lastScrollArgs) && this.lastScrollArgs.slice()
    if (scrollLeft !== this.state.offsetLeft && args) {
      const bodyWidth = this.lastScrollArgs[4]
      if (scrollLeft < 0) scrollLeft = 0
      if (scrollLeft > this.getContentWidth() - bodyWidth) scrollLeft = this.getContentWidth() - bodyWidth
      args[0] = scrollLeft / (this.getContentWidth() - args[4])
      args[1] = this.state.scrollTop
      args[6] = 0
      args[7] = 0
      this.handleScroll(...args)
    }
  }

  adjustScrollLeft() {
    const { scrollLeft } = this.props
    this.resetFloatFixed()
    if (isNumber(scrollLeft) && scrollLeft > 0) {
      const v = this.headWrapper.clientWidth
      const offset = this.getContentWidth() - v
      this.setState({ scrollLeft: scrollLeft / offset, offsetLeft: scrollLeft })
    }
  }

  resetFloatFixed() {
    if (!this.headWrapper || !this.tbody) return
    const { fixed } = this.props
    const delta = fixed === 'x' ? 0 : BAR_WIDTH
    const floatFixed = Math.abs(this.headWrapper.clientWidth - this.tbody.clientWidth) !== delta
    if (floatFixed !== this.state.floatFixed) {
      this.setState({ floatFixed })
    }
  }

  resetIndex() {
    const { currentIndex } = this.state
    if (this.props.data.length >= currentIndex) return currentIndex
    // if data.length < currentIndex
    return this.props.data.length
  }

  bindElement(key, el) {
    this[key] = el
  }

  scrollToIndex(index, callback) {
    if (!this.$isMounted) return
    if (index >= 1) index -= 1
    if (index < 0) index = 0
    const contentHeight = this.getContentHeight()
    const outerHeight =
      getParent(
        this.realTbody
        // `.${tableClass('body')}`
      ).clientHeight - 12
    let currentIndex = this.checkScrollToIndex(index, outerHeight)
    const sumHeight = this.getSumHeight(0, currentIndex)
    let scrollTop = sumHeight / contentHeight
    let marginTop = scrollTop * outerHeight
    let offsetScrollTop = sumHeight + marginTop

    if (offsetScrollTop > contentHeight) {
      offsetScrollTop = contentHeight
      currentIndex = this.props.data.length - this.props.itemsInView
      scrollTop = 1
      marginTop = outerHeight
    }

    this.lastScrollArgs[1] = scrollTop

    this.setState({ currentIndex, scrollTop }, callback)
    this.lastScrollTop = offsetScrollTop

    this.tbody.style.marginTop = `${marginTop}px`

    setTranslate(this.tbody, `-${this.state.offsetLeft}px`, `-${offsetScrollTop}px`)
  }

  // business component needed
  scrollOffset(index, callback) {
    const { currentIndex } = this.state
    const outerHeight =
      getParent(
        this.realTbody
        // `.${tableClass('body')}`
      ).clientHeight - 12
    const lastRowHeight = this.cachedRowHeight[this.cachedRowHeight.length - 1]
    if (this.state.scrollTop === 1 && index >= 0) return
    if (lastRowHeight && this.realTbody.clientHeight - outerHeight < lastRowHeight && index >= 0) return
    let scrollIndex = currentIndex + index + 1
    if (currentIndex === 1 && index === -1) {
      scrollIndex = 0
    }

    this.scrollToIndex(scrollIndex, callback)
  }

  handleScroll(...args) {
    if (!this.tbody || this.realTbody.clientHeight === 0) return
    // eslint-disable-next-line no-unused-vars
    const [x, y, max, bar, v, h, pixelX, pixelY] = args
    this.lastScrollArgs = args
    const { data, lineHeight, itemsInView } = this.props
    const contentWidth = this.getContentWidth()
    const contentHeight = this.getContentHeight()
    let left = x * (contentWidth - v)
    let scrollTop = h > contentHeight ? 0 : y
    let right = max - left
    if (right < 0) right = 0

    /* set x */
    if (left < 0) left = 0
    // this.resetWidth(left, right)
    /* set x end */

    /* set y */
    this.tbody.style.marginTop = `${scrollTop * h}px`

    if (pixelY === undefined) {
      // drag scroll bar

      const index = this.getIndex(scrollTop)
      const lastRowHeight = this.getLastRowHeight(index)
      const offsetScrollTop = this.getSumHeight(0, index) + scrollTop * this.realTbody.clientHeight

      this.setState({ currentIndex: index })
      this.lastScrollTop = offsetScrollTop
      setTranslate(this.tbody, `-${left}px`, `-${offsetScrollTop + lastRowHeight}px`)
    } else if (pixelY === 0) {
      // whell x
      setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    } else if (contentHeight < h) {
      this.lastScrollTop = 0
      scrollTop = 0
      setTranslate(this.tbody, `-${left}px`, '0px')
      this.setState({ currentIndex: 0 })
    } else {
      // wheel scroll

      this.lastScrollTop += pixelY
      if (this.lastScrollTop < 0) this.lastScrollTop = 0

      // scroll over bottom
      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight

      let temp = this.lastScrollTop - scrollTop * h
      let index = 0
      while (temp > 0) {
        temp -= this.cachedRowHeight[index] || lineHeight
        index += 1
      }

      // offset last row
      index -= 1

      if (data.length - itemsInView < index) index = data.length - itemsInView
      if (index < 0) index = 0

      this.setState({ currentIndex: index })

      scrollTop = this.lastScrollTop / contentHeight
      setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    }
    /* set y end */

    this.setState({
      scrollLeft: x,
      scrollTop,
      offsetLeft: left,
      // offsetRight: right,
      // colgroup: isResize ? undefined : colgroup,
      // resize: isResize ? v : false,
    })

    if (this.props.onScroll) this.props.onScroll(x, y, left)
  }

  render() {
    const {
      style,
      keygen,
      data,
      itemsInView,
      width,
      fixed,
      innerScrollAttr,
      className,
      renderItem,
      height,
    } = this.props
    const { scrollTop, scrollLeft, currentIndex } = this.state
    const ms = Object.assign({}, style, height && { height })
    const contentWidth = this.getContentWidth()

    if (!data || data.length === 0) {
      return <div />
    }

    const prevHeight = this.getSumHeight(0, currentIndex)

    const items = data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => {
      const idx = currentIndex + i
      return <Fragment key={getKey(d, keygen, idx)}>{renderItem(d, idx, this.setRowHeight)}</Fragment>
    })

    return (
      <Scroll
        style={ms}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        scroll={fixed}
        scrollHeight={this.getContentHeight()}
        scrollWidth={contentWidth}
        onScroll={this.handleScroll}
        className={className}
        innerScrollAttr={innerScrollAttr}
      >
        <div ref={this.bindTbody} style={{ width }}>
          <div style={{ height: prevHeight }} />
          <div ref={this.bindRealTbody}>{items}</div>
        </div>
      </Scroll>
    )
  }
}

LazyList.propTypes = {
  style: PropTypes.shape({}),
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  data: PropTypes.array,
  fixed: PropTypes.string.isRequired,
  onScroll: PropTypes.func,
  lineHeight: PropTypes.number,
  itemsInView: PropTypes.number,
  tableRef: PropTypes.func,
  width: PropTypes.number,
  scrollLeft: PropTypes.number,
  innerScrollAttr: PropTypes.arrayOf(PropTypes.string),
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
  renderItem: PropTypes.func.isRequired,
}

LazyList.defaultProps = {
  data: [],
  width: undefined,
  itemsInView: 10,
  lineHeight: 32,
}

export default LazyList
