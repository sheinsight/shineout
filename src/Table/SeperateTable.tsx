import React from 'react'
import immer from 'immer'
import { PureComponent } from '../component'
import { setTranslate } from '../utils/dom/translate'
import { range, split } from '../utils/numbers'
import { compareColumns } from '../utils/shallowEqual'
import { getParent } from '../utils/dom/element'
import { tableClass } from './styles'
import Scroll from '../Scroll'
import { BAR_WIDTH } from '../Scroll/Scroll'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'
import Tfoot from './Tfoot'
import { isNumber, isChromeLowerThan } from '../utils/is'
import { Provider as AbsoluteProvider } from './context'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'
import Sticky from '../Sticky'
import { banOverScrollX } from '../utils/dom/scrollBehavior'
import { SeperateTableProps, TheadProps } from './Props'
import { ScrollProps } from '../Scroll/Props'

interface SeperateTableState {
  scrollTop: number
  scrollLeft: number
  offsetLeft?: number
  offsetRight?: number
  currentIndex: number
  floatFixed: boolean
  resize: boolean
  colgroup?: number[]
}

const DefaultProps = {
  rowHeight: 40,
}
class SeperateTable<DataItem, Value> extends PureComponent<SeperateTableProps<DataItem, Value>, SeperateTableState> {
  bindTbody: (el: HTMLDivElement) => void

  bindRealTbody: (el: HTMLTableElement) => void

  bindThead: (el: HTMLTableElement) => void

  bindHeadWrapper: (el: HTMLDivElement) => void

  bindFoot: (el: HTMLTableElement) => void

  rmOverScrollListener?: (() => void) | null

  thead: HTMLTableElement

  tbody: HTMLDivElement

  tfoot: HTMLTableElement

  realTbody: HTMLTableElement

  headWrapper: HTMLDivElement

  cachedRowHeight: number[]

  lastScrollArgs: Parameters<ScrollProps['onScroll']>

  lastScrollTop: number

  ajustBottomScroll: boolean

  renderByExpand: boolean

  lastResetLeft: number

  lastResetRight: number

  lastData: SeperateTableProps<DataItem, Value>['data']

  lastColumns: SeperateTableProps<DataItem, Value>['columns']

  static defaultProps = DefaultProps

  constructor(props: SeperateTableProps<DataItem, Value>) {
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
    this.bindFoot = this.bindElement.bind(this, 'tfoot')
    this.setRowHeight = this.setRowHeight.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)

    this.cachedRowHeight = []
    this.lastScrollArgs = {} as Parameters<ScrollProps['onScroll']>
    this.lastScrollTop = 0

    if (props.tableRef) props.tableRef(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.adjustScrollLeft()
  }

  // reset scrollTop when data changed
  componentDidUpdate(prevProps: SeperateTableProps<DataItem, Value>) {
    if (!this.tbody) return
    // sticky 表头进入视图后需要重新计算宽度
    const inViewChange = prevProps.inView !== this.props.inView
    const dataChange = this.props.data !== prevProps.data
    if (dataChange) {
      const resize = prevProps.data.length === 0 && this.props.data.length
      // eslint-disable-next-line react/no-did-update-set-state
      if (resize || this.props.dataChangeResize) this.setState({ resize: true, colgroup: undefined })
      this.resetHeight()
    }
    if (inViewChange && this.props.inView) {
      this.resetWidth()
    }
    this.updateScrollLeft()
    if (!compareColumns(prevProps.columns, this.props.columns)) {
      this.resetWidth()
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ colgroup: undefined })
    }
    this.ajustBottom(dataChange)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    if (this.rmOverScrollListener) this.rmOverScrollListener()
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
    if (!isChromeLowerThan(128)) {
      // @ts-ignore currentCSSZoom
      const { currentCSSZoom } = document.body
      const zoomRatio = currentCSSZoom && currentCSSZoom > 1 ? 1 / currentCSSZoom : 1
      if (this.props.width) return this.props.width / zoomRatio
      if (this.tbody) return this.tbody.offsetWidth / zoomRatio
      return 0
    }
    if (this.props.width) return this.props.width
    if (this.tbody) return this.tbody.offsetWidth
    return 0
  }

  getSumHeight(start: number, end: number) {
    const { rowHeight = DefaultProps.rowHeight } = this.props
    let height = 0
    for (let i = start; i < end; i++) {
      height += this.cachedRowHeight[i] || rowHeight
    }
    return height
  }

  getLastRowHeight(index: number) {
    const { rowHeight = DefaultProps.rowHeight, data, rowsInView } = this.props

    if (index + rowsInView >= data.length) return 0

    let lastRowHeight = 0
    if (index >= 1 && index < data.length / 2) {
      lastRowHeight = this.cachedRowHeight[index - 1] || rowHeight
    }
    return lastRowHeight
  }

  setRowHeight(height: number, index: number, expand: boolean) {
    const { rowHeight = DefaultProps.rowHeight } = this.props
    const oldHeight = this.cachedRowHeight[index]
    this.cachedRowHeight[index] = height
    if (!this.renderByExpand && expand) {
      this.renderByExpand = true
    }
    if (!this.tbody) return

    const { offsetLeft, currentIndex } = this.state
    if (currentIndex === index && !oldHeight) {
      this.lastScrollTop += height - rowHeight
      if (this.lastScrollTop < 0) this.lastScrollTop = 0
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

  setTop(scrollHeight: number, fullHeight: number, top: number) {
    const { offsetLeft } = this.state
    this.tbody.style.marginTop = `${scrollHeight * top}px`
    this.lastScrollTop = fullHeight * top
    setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
    setTimeout(() => {
      this.setState({ scrollTop: top })
      this.lastScrollArgs[1] = top
    })
  }

  checkScrollToIndex(index: number, outerHeight: number) {
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

  ajustBottom(dataChange: boolean) {
    const reachBottom = this.lastScrollArgs[1] === 1
    const drag = this.lastScrollArgs[8]
    if (!dataChange && reachBottom && drag) {
      if (this.ajustBottomScroll) return
      this.ajustBottomScroll = true
      setTimeout(() => {
        this.handleScroll(...this.lastScrollArgs)
      })
    }
  }

  updateScrollLeft() {
    let { scrollLeft } = this.props
    this.resetFloatFixed()
    if (!isNumber(scrollLeft)) return
    const args =
      Array.isArray(this.lastScrollArgs) && (this.lastScrollArgs.slice() as Parameters<ScrollProps['onScroll']>)
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
    let max = this.props.data.length - this.props.rowsInView
    if (max < 0) max = 0
    if (max >= currentIndex) return currentIndex
    // if data.length < currentIndex
    return max
  }

  resetHeight() {
    const { scrollTop } = this.state
    const { treeColumnsName, changedByExpand } = this.props
    const fullHeight = this.getContentHeight()
    const height = fullHeight * scrollTop

    const scrollHeight = this.lastScrollArgs[5]
    // Height reduced
    if (this.lastScrollTop - height >= 1) {
      let index = this.resetIndex()
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
        // Blank space may appear after clicking the top or bottom collapse button
        if (fullHeight - this.lastScrollTop < (1 - this.lastScrollArgs[1]) * scrollHeight) {
          if (fullHeight <= scrollHeight) {
            index = 0
          } else {
            this.setTop(scrollHeight, fullHeight, 1)
            return
          }
        } else {
          return
        }
      }

      if (index === 0) {
        this.setTop(scrollHeight, fullHeight, 0)
      } else if (fullHeight - this.lastScrollTop < (1 - this.lastScrollArgs[1]) * scrollHeight) {
        this.setTop(scrollHeight, fullHeight, 1)
      } else {
        const keepTop = this.lastScrollTop - this.lastScrollArgs[1] * scrollHeight
        // keepTop = scrollTopLength - scrollTopLength/fullHeight * scrollHeight
        // keepTop = (1 - scrollHeight / fullHeight) * scrollTopLength
        const scrollTopLength = keepTop / (1 - scrollHeight / fullHeight)
        this.lastScrollTop = scrollTopLength
        const st = this.lastScrollTop / fullHeight
        this.setTop(scrollHeight, fullHeight, st)
      }
    } else if (this.lastScrollTop - height < 1) {
      setTimeout(() => {
        this.lastScrollArgs[1] = this.lastScrollTop / fullHeight
        this.setState({ scrollTop: this.lastScrollTop / fullHeight })
      })
    }
  }

  resetWidth(left = this.lastResetLeft || 0, right = this.lastResetRight || 0) {
    this.lastResetLeft = left
    this.lastResetRight = right
    setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    if (this.thead) {
      setTranslate(this.thead, `-${left}px`, '0')
    }
    if (this.tfoot) {
      setTranslate(this.tfoot, `-${left}px`, '0')
    }

    ;[this.thead, this.tbody, this.tfoot].forEach(el => {
      if (!el) return
      ;[].forEach.call(el.parentNode!.querySelectorAll('td, th'), (cell: HTMLElement) => {
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

  bindElement(key: 'thead' | 'tbody' | 'tfoot' | 'realTbody' | 'headWrapper', el: HTMLElement) {
    // @ts-ignore
    this[key] = el
    if (key === 'headWrapper') {
      if (el) {
        this.rmOverScrollListener = banOverScrollX(el)
      } else if (this.rmOverScrollListener) {
        this.rmOverScrollListener()
        this.rmOverScrollListener = null
      }
    }
  }

  scrollToTop() {
    this.scrollToIndex(0)
  }

  scrollToIndex(index: number, callback?: () => void) {
    if (!this.$isMounted) return
    if (index >= 1) index -= 1
    if (index < 0) index = 0
    const contentHeight = this.getContentHeight()
    const outerHeight = getParent(this.realTbody, `.${tableClass('body')}`)!.clientHeight - 12

    let currentIndex = this.checkScrollToIndex(index, outerHeight)
    const sumHeight = this.getSumHeight(0, currentIndex)
    let scrollTop = sumHeight / contentHeight
    let marginTop = scrollTop * outerHeight
    let offsetScrollTop = sumHeight + marginTop

    // 容器高度大于总高度，未出现 y 滚动条的情况无需进行跳转
    if (outerHeight >= contentHeight) {
      return
    }

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
  scrollOffset(index: number, callback: () => void) {
    const { currentIndex } = this.state
    const outerHeight = getParent(this.realTbody, `.${tableClass('body')}`)!.clientHeight - 12
    const lastRowHeight = this.cachedRowHeight[this.cachedRowHeight.length - 1]
    if (this.state.scrollTop === 1 && index >= 0) return
    if (lastRowHeight && this.realTbody.clientHeight - outerHeight < lastRowHeight && index >= 0) return
    let scrollIndex = currentIndex + index + 1
    if (currentIndex === 1 && index === -1) {
      scrollIndex = 0
    }

    this.scrollToIndex(scrollIndex, callback)
  }

  handleScroll(...args: Parameters<ScrollProps['onScroll']>) {
    if (!this.tbody || this.realTbody.clientHeight === 0) return
    // @ts-ignore
    const [x, y, max, bar, v, h, pixelX, pixelY] = args
    const { colgroup } = this.state
    const isResize = v && this.lastScrollArgs[4] && v !== this.lastScrollArgs[4]
    this.lastScrollArgs = args
    if (this.ajustBottomScroll) {
      this.lastScrollArgs[8] = false
      this.ajustBottomScroll = false
    }
    const { data, rowHeight = DefaultProps.rowHeight, rowsInView } = this.props
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

  handleSortChange(...args: Parameters<TheadProps<DataItem, Value>['onSortChange']>) {
    this.scrollToIndex(0)
    this.props.onSortChange(...args)
  }

  handleColgroup(tds: NodeListOf<HTMLTableCellElement>) {
    const { columns } = this.props
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const { width } = tds[i].getBoundingClientRect()
      const colSpan = parseInt(tds[i].getAttribute('colspan')!, 10)
      if (colSpan && colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j].width!)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup, resize: false })
  }

  renderBody(floatClass: string[]) {
    const {
      data,
      rowsInView,
      columns,
      width,
      fixed,
      rowHeight,
      columnResizable,
      innerScrollAttr,
      bordered,
      ...others
    } = this.props
    const { colgroup, scrollTop, scrollLeft, offsetLeft, offsetRight, currentIndex, resize } = this.state
    const contentWidth = this.getContentWidth()
    const minWidthSup = columns.find(d => d.minWidth)

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
        footer={this.renderFooter(floatClass)}
      >
        <div ref={this.bindTbody} className={tableClass('scroll-inner')} style={{ width }}>
          <div style={{ height: prevHeight }} />
          <table
            className={tableClass(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')}
            style={{ width }}
            ref={this.bindRealTbody}
          >
            <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable && this.lastScrollArgs[4]} />
            <Tbody
              {...others}
              bordered={bordered}
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
              columnResizable={columnResizable}
            />
          </table>
        </div>
      </Scroll>
    )
  }

  renderHeader(floatClass: string[]) {
    const { columns, width, onResize, columnResizable, sticky, bordered } = this.props
    const { colgroup } = this.state

    const header = (
      <div key="head" className={tableClass('head', ...floatClass)} ref={this.bindHeadWrapper}>
        <table style={{ width }} ref={this.bindThead} className={tableClass(bordered && 'table-bordered')}>
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

  renderFooter(floatClass: string[]) {
    const { columns, width, columnResizable, bordered, summary, data, fixed } = this.props
    const { colgroup } = this.state
    if (!(data && data.length)) return null
    if (!(summary && summary.length)) return null
    const scrollX = fixed === 'x' || fixed === 'both'
    const footer = (
      <div key="foot" className={tableClass('foot', ...floatClass, scrollX && 'foot-scroll-x')}>
        <table ref={this.bindFoot} style={{ width }} className={tableClass(bordered && 'table-bordered')}>
          <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable && this.lastScrollArgs[4]} />
          <Tfoot {...this.props} />
        </table>
      </div>
    )

    return footer
  }

  render() {
    const { fixed, hideHeader } = this.props
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
      hideHeader ? null : this.renderHeader(floatClass),
      <AbsoluteProvider value key="body">
        {this.renderBody(floatClass)}
      </AbsoluteProvider>,
    ]
  }
}

export default SeperateTable
