import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { setTranslate } from '../utils/dom/translate'
import { range, split } from '../utils/numbers'
import { compareColumns } from '../utils/shallowEqual'
import { getParent } from '../utils/dom/element'
import { tableClass } from '../styles'
import Scroll from '../Scroll'
import { BAR_WIDTH } from '../Scroll/Scroll'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'
import { isNumber } from '../utils/is'
import { Provider as AbsoluteProvider } from './context'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'
import Sticky from '../Sticky'

class SeperateTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      scrollLeft: 0,
      scrollTop: 0,
      floatFixed: true,
      resize: false,
    }

    this.bindTbody = this.bindElement.bind(this, 'tbody')
    this.bindRealTbody = this.bindElement.bind(this, 'realTbody')
    this.bindThead = this.bindElement.bind(this, 'thead')
    this.bindHeadWrapper = this.bindElement.bind(this, 'headWrapper')
    this.setRowHeight = this.setRowHeight.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)

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
  componentDidUpdate(prevProps) {
    if (!this.tbody) return
    const dataChange = this.props.rawData !== prevProps.rawData
    // Use raw data comparison, avoid tree data,
    // because tree data will be re-parsed and generate new data
    if (dataChange) {
      const resize = prevProps.data.length === 0 && this.props.data.length
      if (resize || this.props.dataChangeResize) this.setState({ resize: true, colgroup: undefined })
      this.resetHeight()
    }
    this.updateScrollLeft()
    if (!compareColumns(prevProps.columns, this.props.columns)) {
      this.resetWidth()
      this.setState({ colgroup: undefined })
    }
    this.ajustBottom(dataChange)
  }

  getIndex(scrollTop = this.state.scrollTop) {
    const { data, rowsInView } = this.props
    const max = data.length
    const mcf = scrollTop > 0.5 ? Math.ceil : Math.floor
    let index = mcf(scrollTop * max - rowsInView * scrollTop)
    if (index > max - rowsInView) index = max - rowsInView
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
    const { rowHeight } = this.props
    let height = 0
    for (let i = start; i < end; i++) {
      height += this.cachedRowHeight[i] || rowHeight
    }
    return height
  }

  getLastRowHeight(index) {
    const { rowHeight, data, rowsInView } = this.props

    if (index + rowsInView >= data.length) return 0

    let lastRowHeight = 0
    if (index >= 1 && index < data.length / 2) {
      lastRowHeight = this.cachedRowHeight[index - 1] || rowHeight
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
      this.lastScrollTop += height - this.props.rowHeight
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
    // if (this.lastScrollArgs[1] === 1) {
    //   setTimeout(() => {
    //     this.handleScroll(
    //       ...immer(this.lastScrollArgs, draft => {
    //         draft[7] = undefined
    //       })
    //     )
    //   })
    // }
  }

  checkScrollToIndex(index, outerHeight) {
    const { data, rowsInView } = this.props
    const max = data.length
    if (max - index >= rowsInView) {
      return index
    }
    const contentHeight = this.getSumHeight(index, max)
    if (contentHeight >= outerHeight) {
      return index
    }
    return max
  }

  ajustBottom(dataChange) {
    const reachBottom = this.lastScrollArgs[1] === 1
    const drag = this.lastScrollArgs[7] === undefined
    if (!dataChange && reachBottom && drag) {
      setTimeout(() => {
        this.handleScroll(...this.lastScrollArgs)
      })
    }
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

  resetHeight() {
    const { scrollTop, offsetLeft } = this.state
    const { treeColumnsName, changedByExpand } = this.props
    const fullHeight = this.getContentHeight()
    const height = fullHeight * scrollTop

    const scrollHeight = this.lastScrollArgs[5]

    if (this.lastScrollTop - height >= 1) {
      const index = this.resetIndex()
      this.setState({ currentIndex: index })

      if (this.renderByExpand) {
        this.renderByExpand = false
        return
      }

      // this.lastScrollTop = height
      // if (treeColumnsName && changedByExpand) {
      //   this.tbody.style.marginTop = `${this.lastScrollTop - this.realOffset}px`
      //   setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
      //   return
      // }
      if (treeColumnsName && changedByExpand) {
        if (fullHeight - this.lastScrollTop < (1 - this.lastScrollArgs[1]) * scrollHeight) {
          this.tbody.style.marginTop = `${scrollHeight}px`
          setTranslate(this.tbody, `-${offsetLeft}px`, `-${fullHeight}px`)
          this.lastScrollTop = fullHeight
        }
        return
      }

      if (index === 0) {
        this.lastScrollTop = 0
        setTimeout(() => {
          this.setState({ scrollTop: 0 })
        })
        this.tbody.style.marginTop = '0px'
        setTranslate(this.tbody, `-${offsetLeft}px`, '0px')
      } else {
        setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
      }
    } else if (this.lastScrollTop - height < 1) {
      setTimeout(() => {
        this.setState({ scrollTop: this.lastScrollTop / fullHeight })
      })
    }
  }

  resetWidth(left = this.lastResetLeft || 0, right = this.lastResetRight || 0) {
    this.lastResetLeft = left
    this.lastResetRight = right
    setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    setTranslate(this.thead, `-${left}px`, '0')
    ;[this.thead, this.tbody].forEach(el => {
      ;[].forEach.call(el.parentNode.querySelectorAll('td, th'), cell => {
        if (cell.classList.contains(tableClass(CLASS_FIXED_LEFT))) {
          setTranslate(cell, `${left}px`, '0')
        } else if (cell.classList.contains(tableClass(CLASS_FIXED_RIGHT))) {
          setTranslate(cell, `-${right}px`, '0')
        } else if (cell.style.transform) {
          setTranslate(cell, '0', '0')
        }
      })
    })
  }

  bindElement(key, el) {
    this[key] = el
  }

  scrollToTop() {
    this.scrollToIndex(0)
  }

  scrollToIndex(index, callback) {
    if (!this.$isMounted) return
    if (index >= 1) index -= 1
    if (index < 0) index = 0
    const contentHeight = this.getContentHeight()
    const outerHeight = getParent(this.realTbody, `.${tableClass('body')}`).clientHeight - 12
    let currentIndex = this.checkScrollToIndex(index, outerHeight)
    const sumHeight = this.getSumHeight(0, currentIndex)
    let scrollTop = sumHeight / contentHeight
    let marginTop = scrollTop * outerHeight
    let offsetScrollTop = sumHeight + marginTop

    if (offsetScrollTop > contentHeight) {
      offsetScrollTop = contentHeight
      currentIndex = this.props.data.length - this.props.rowsInView
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
    const outerHeight = getParent(this.realTbody, `.${tableClass('body')}`).clientHeight - 12
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
    const [x, y, max, bar, v, h, pixelX, pixelY] = args
    const { colgroup } = this.state
    const isResize = v && this.lastScrollArgs[4] && v !== this.lastScrollArgs[4]
    this.lastScrollArgs = args
    const { data, rowHeight, rowsInView } = this.props
    const contentWidth = this.getContentWidth()
    const contentHeight = this.getContentHeight()
    let left = x * (contentWidth - v)
    let scrollTop = h > contentHeight ? 0 : y
    let right = max - left
    if (right < 0) right = 0

    /* set x */
    if (left < 0) left = 0
    this.resetWidth(left, right)
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
        temp -= this.cachedRowHeight[index] || rowHeight
        index += 1
      }

      // offset last row
      index -= 1

      if (data.length - rowsInView < index) index = data.length - rowsInView
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
      offsetRight: right,
      colgroup: isResize ? undefined : colgroup,
      resize: isResize ? v : false,
    })

    if (this.props.onScroll) this.props.onScroll(x, y, left)
  }

  handleSortChange(...args) {
    this.scrollToIndex(0)
    this.props.onSortChange(...args)
  }

  handleColgroup(tds) {
    const { columns } = this.props
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const { width } = tds[i].getBoundingClientRect()
      const colSpan = parseInt(tds[i].getAttribute('colspan'), 10)
      if (colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j].width)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup, resize: false })
  }

  renderBody(floatClass) {
    const {
      data,
      rowsInView,
      columns,
      width,
      fixed,
      rowHeight,
      columnResizable,
      innerScrollAttr,
      ...others
    } = this.props
    const { colgroup, scrollTop, scrollLeft, offsetLeft, offsetRight, currentIndex, resize } = this.state
    const contentWidth = this.getContentWidth()

    if (!data || data.length === 0) {
      return <div />
    }

    let dataUpdated = this.lastData !== data // Incorrect height due to changing data length dynamically
    if (this.lastData && !dataUpdated) dataUpdated = this.lastData.length !== data.length
    this.lastData = data

    if (!dataUpdated && this.lastColumns && !compareColumns(this.lastColumns, columns)) dataUpdated = true
    this.lastColumns = columns
    const prevHeight = this.getSumHeight(0, currentIndex)
    const hasNotRenderRows = data.length > rowsInView

    return (
      <Scroll
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        scroll={fixed}
        scrollHeight={this.getContentHeight()}
        scrollWidth={contentWidth}
        onScroll={this.handleScroll}
        className={tableClass('body', ...floatClass)}
        innerScrollAttr={innerScrollAttr}
      >
        <div ref={this.bindTbody} className={tableClass('scroll-inner')} style={{ width }}>
          <div style={{ height: prevHeight }} />
          <table style={{ width }} ref={this.bindRealTbody}>
            <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable && this.lastScrollArgs[4]} />
            <Tbody
              {...others}
              columns={columns}
              onBodyRender={this.handleColgroup}
              index={currentIndex}
              offsetLeft={offsetLeft}
              offsetRight={offsetRight}
              data={data.slice(currentIndex, currentIndex + rowsInView)}
              setRowHeight={this.setRowHeight}
              hasNotRenderRows={hasNotRenderRows}
              dataUpdated={dataUpdated}
              resize={resize}
              colgroup={colgroup}
              onScrollTop={this.scrollToTop}
            />
          </table>
        </div>
      </Scroll>
    )
  }

  renderHeader(floatClass) {
    const { columns, width, onResize, columnResizable, sticky } = this.props
    const { colgroup } = this.state

    const header = (
      <div key="head" className={tableClass('head', ...floatClass)} ref={this.bindHeadWrapper}>
        <table style={{ width }} ref={this.bindThead}>
          <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable && this.lastScrollArgs[4]} />
          <Thead {...this.props} colgroup={colgroup} onSortChange={this.handleSortChange} onColChange={onResize} />
        </table>
      </div>
    )

    if (sticky) {
      const stickyProps = Object.assign({ top: 0 }, sticky)
      return (
        <Sticky {...stickyProps} key="head">
          {header}
        </Sticky>
      )
    }

    return header
  }

  render() {
    const { fixed } = this.props
    const { scrollLeft, floatFixed } = this.state

    const floatClass = []

    if (floatFixed) {
      if (scrollLeft > 0) {
        floatClass.push('float-left')
      }
      if (scrollLeft !== 1) {
        floatClass.push('float-right')
      }
    }

    if (fixed === 'y' || fixed === 'both') {
      floatClass.push('scroll-y')
    }

    return [
      this.renderHeader(floatClass),
      <AbsoluteProvider value key="body">
        {this.renderBody(floatClass)}
      </AbsoluteProvider>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps(PropTypes, 'size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  fixed: PropTypes.string.isRequired,
  onScroll: PropTypes.func,
  rowHeight: PropTypes.number,
  rowsInView: PropTypes.number.isRequired,
  tableRef: PropTypes.func,
  width: PropTypes.number,
  scrollLeft: PropTypes.number,
  onResize: PropTypes.func,
  innerScrollAttr: PropTypes.arrayOf(PropTypes.string),
  sticky: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

SeperateTable.defaultProps = {
  data: undefined,
  rowHeight: 40,
  width: undefined,
}

export default SeperateTable
