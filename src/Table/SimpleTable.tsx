import React from 'react'
import { PureComponent } from '../component'
import { tableClass } from './styles'
import { range, split } from '../utils/numbers'
import Colgroup from './Colgroup'
import Tbody from './Tbody'
import Thead from './Thead'
import Tfoot from './Tfoot'
import { compareColumns } from '../utils/shallowEqual'
import Sticky from '../Sticky'
import { addResizeObserver } from '../utils/dom/element'
import { StickyProps } from '../Sticky/Props'
import { ColumnItem, ColumnOrder, SimpleTableProps } from './Props'

function setScrollLeft(target: HTMLElement, scrollLeft: number) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft
}

interface SimpleTableState {
  colgroup?: number[]
  overHeight: boolean
  overWidth: boolean
  resize: boolean
}

class SimpleTable<DataItem, Value> extends PureComponent<SimpleTableProps<DataItem, Value>, SimpleTableState> {
  bindHeader: (el: HTMLDivElement) => void

  bindBody: (el: HTMLDivElement) => void

  bindFooter: (el: HTMLDivElement) => void

  removeReiszeObserver: () => void

  body: HTMLDivElement

  header: HTMLDivElement

  footer: HTMLDivElement

  lastColGroup: number[]

  cyclicCounter: number

  constructor(props: SimpleTableProps<DataItem, Value>) {
    super(props)

    this.state = {
      colgroup: undefined,
      overHeight: false,
      overWidth: false,
      resize: false,
    }
    this.handleSortChange = this.handleSortChange.bind(this)
    this.bindHeader = this.bindElement.bind(this, 'header')
    this.bindBody = this.bindElement.bind(this, 'body')
    this.bindFooter = this.bindElement.bind(this, 'footer')
    this.handleScroll = this.handleScroll.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.resetColGroup = this.resetColGroup.bind(this)

    // 循环计数器。某些情况[*]下滚动条的出现会导致死循环问题，这里做一个计数器，超过一定次数就不再重置，认定最大 10 次为死循环
    // [*] 横向滚动条的出现可能导致竖向滚动条从有到无。此时需要重新计算表头的宽度，否则会出现表头与表格内容不对齐的问题。纵向滚动条消失后，可能导致横向滚动条宽度足够，纵向滚动条再次出现，又导致横向滚动条消失，如此循环。
    this.cyclicCounter = 0
  }

  componentDidMount() {
    this.scrollCheck()
  }

  componentDidUpdate(prevProps: SimpleTableProps<DataItem, Value>) {
    this.scrollCheck()
    const resize = prevProps.data.length === 0 && this.props.data.length
    // when resize
    if (resize && this.body) this.handleScroll({ currentTarget: this.body })
    const shouldResetColgroup = this.props.dataChangeResize && this.props.data !== prevProps.data
    if (resize || shouldResetColgroup || !compareColumns(prevProps.columns, this.props.columns)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ colgroup: undefined, resize: true })
    }
  }

  componentWillUnmount() {
    if (this.body) this.body.removeEventListener('wheel', this.handleScroll as any)
    if (this.removeReiszeObserver) this.removeReiszeObserver()
  }

  bindElement(key: 'header' | 'body' | 'footer', el: HTMLDivElement) {
    this[key] = el
    // this.body will be undefined on componentDidMount when columns length is 0
    if (key === 'body' && el) {
      el.addEventListener('wheel', this.handleScroll as any, { passive: false })
      this.removeReiszeObserver = addResizeObserver(el, this.resetColGroup, { direction: 'x' })
    }
  }

  resetColGroup() {
    this.lastColGroup = this.state.colgroup || this.lastColGroup
    this.setState({ colgroup: undefined, resize: true })
  }

  scrollCheck() {
    if (!this.body) return
    if (this.cyclicCounter > 10) {
      this.setState({ overHeight: true })
      return
    }
    const overHeight = this.body.scrollHeight > this.body.clientHeight
    const overWidth = this.body.scrollWidth > this.body.clientWidth
    if (overWidth !== this.state.overWidth) this.setState({ overWidth })
    if (overHeight !== this.state.overHeight) this.setState({ overHeight })

    this.cyclicCounter += 1

    setTimeout(() => {
      this.cyclicCounter = 0
    })
  }

  handleSortChange(
    finalOrder: ColumnOrder | undefined,
    sorter: ColumnItem<DataItem>['sorter'],
    index: number,
    cancelOrder: ColumnOrder,
    // 是否是自动触发
    manual: boolean
  ) {
    if (this.body) this.body.scrollTop = 0
    this.props.onSortChange(finalOrder, sorter, index, cancelOrder, manual)
  }

  handleColgroup(tds: NodeListOf<HTMLTableCellElement>) {
    const { columns } = this.props
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const { width } = tds[i].getBoundingClientRect()
      const colSpan = parseInt(tds[i].getAttribute('colspan') || '', 10)
      if (colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j]?.width || 0)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup, resize: false })
  }

  handleScroll({ currentTarget }: { currentTarget: HTMLElement }) {
    const { scrollLeft } = currentTarget
    setScrollLeft(this.header, scrollLeft)
    setScrollLeft(this.body, scrollLeft)
    setScrollLeft(this.footer, scrollLeft)
  }

  renderHeader() {
    const { columns, width, data, onResize, columnResizable, sticky, bordered } = this.props
    const { colgroup, overHeight } = this.state
    const inner = (
      <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
        {/* keep thead colgroup stable */}
        <Colgroup colgroup={colgroup || this.lastColGroup} columns={columns} resizable={columnResizable} />
        <Thead {...this.props} colgroup={colgroup} onSortChange={this.handleSortChange} onColChange={onResize} />
      </table>
    )
    const empty = data.length === 0
    const headerStyle: React.CSSProperties = {}
    if (!empty) headerStyle.overflowY = overHeight ? 'scroll' : 'hidden'

    const header = (
      <div
        key="head"
        style={headerStyle}
        className={tableClass('head', 'simple-head', empty && 'empty-head')}
        ref={this.bindHeader}
      >
        {inner}
      </div>
    )
    if (sticky) {
      const stickyProps = Object.assign({ top: 0 }, sticky) as StickyProps
      return (
        <Sticky {...stickyProps} key="head">
          {header}
        </Sticky>
      )
    }
    return header
  }

  renderFooter() {
    const { columns, width, data, columnResizable, bordered, summary } = this.props
    const { colgroup, overHeight, overWidth } = this.state
    if (!(data && data.length)) return null
    if (!(summary && summary.length)) return null

    const inner = (
      <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
        <Colgroup colgroup={colgroup || this.lastColGroup} columns={columns} resizable={columnResizable} />
        <Tfoot {...this.props} />
      </table>
    )
    const footStyle: React.CSSProperties = {}
    footStyle.overflowY = overHeight ? 'scroll' : 'hidden'

    const footer = (
      <div
        key="foot"
        style={footStyle}
        className={tableClass('foot', overWidth && 'foot-scroll-x', 'simple-foot')}
        ref={this.bindFooter}
        onScroll={this.handleScroll}
      >
        {inner}
      </div>
    )
    return footer
  }

  renderBody() {
    const { columns, width, fixed, columnResizable, bordered, ...others } = this.props
    const { colgroup, resize } = this.state
    const minWidthSup = columns.find(d => d.minWidth)
    return (
      <div key="body" className={tableClass('simple-body')} ref={this.bindBody} onScroll={this.handleScroll}>
        <table
          style={{ width }}
          className={tableClass(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')}
        >
          <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable} />
          <Tbody
            colgroup={colgroup}
            lazy={false}
            index={0}
            columns={columns}
            onBodyRender={this.handleColgroup}
            resize={resize}
            bordered={bordered}
            columnResizable={columnResizable}
            {...others}
          />
        </table>
      </div>
    )
  }

  render() {
    const { columns, width, children, hideHeader, bordered } = this.props
    if (!columns || columns.length === 0)
      return (
        <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
          {children}
        </table>
      )
    return [hideHeader ? null : this.renderHeader(), this.renderBody(), this.renderFooter(), children]
  }
}

export default SimpleTable
