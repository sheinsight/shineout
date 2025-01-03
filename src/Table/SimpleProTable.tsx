import React from 'react'
import { PureComponent } from '../component'
import { tableClass } from './styles'
import { range, split } from '../utils/numbers'
import Colgroup from './Colgroup'
import Tbody from './Tbody'
import TheadComponent from './Thead'
import Tfoot from './Tfoot'
import { compareColumns } from '../utils/shallowEqual'
import { ColumnItem, ColumnOrder, SimpleTableProps, TheadProps } from './Props'
import TableContext from './TableContext'

function setScrollLeft(target: HTMLElement, scrollLeft: number) {
  target.scrollLeft = scrollLeft
}

interface SimpleTableState {
  colgroup?: number[]
  overHeight: boolean
  overWidth: boolean
  resize: boolean
  scrollLeft: number
}

const Thead = (props: TheadProps<any, any>) => (
  <TableContext.Consumer>
    {({ colgroup, fixed }) => <TheadComponent {...props} colgroup={colgroup} fixed={fixed} />}
  </TableContext.Consumer>
)

class SimpleTable<DataItem, Value> extends PureComponent<SimpleTableProps<DataItem, Value>, SimpleTableState> {
  bindBody: (el: HTMLDivElement) => void

  body: HTMLDivElement

  lastColGroup: number[]

  cyclicCounter: number

  constructor(props: SimpleTableProps<DataItem, Value>) {
    super(props)

    this.state = {
      colgroup: undefined,
      overHeight: false,
      overWidth: false,
      resize: false,
      scrollLeft: 0,
    }
    this.handleSortChange = this.handleSortChange.bind(this)
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
        split(width, range(colSpan).map(j => columns[i + j].width!)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup, resize: false })
  }

  handleScroll({ currentTarget }: { currentTarget: HTMLElement }) {
    const { scrollLeft } = currentTarget
    if (this.body) setScrollLeft(this.body, scrollLeft)
    this.setState({ scrollLeft })
  }

  renderHeader() {
    const { hideHeader, onResize, sticky } = this.props
    if (hideHeader) return null

    const { colgroup } = this.state

    return (
      <Thead
        {...this.props}
        colgroup={colgroup}
        onSortChange={this.handleSortChange}
        onColChange={onResize}
        sticky={sticky}
      />
    )
  }

  renderFooter() {
    const { data, summary } = this.props
    if (!(data && data.length)) return null
    if (!(summary && summary.length)) return null

    return <Tfoot {...this.props} />
  }

  renderBody(floatClass: string[]) {
    const { columns, width, fixed, columnResizable, bordered, ...others } = this.props
    const { colgroup, resize } = this.state
    const minWidthSup = columns.find(d => d.minWidth)
    return (
      <div key="body" className={tableClass('simple-body', ...floatClass)} onScroll={this.handleScroll}>
        <table
          style={{ width }}
          className={tableClass(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')}
        >
          <Colgroup colgroup={colgroup || this.lastColGroup} columns={columns} resizable={columnResizable} />
          {this.renderHeader()}
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
          {this.renderFooter()}
        </table>
      </div>
    )
  }

  render() {
    const { columns, width, children, bordered } = this.props
    const { scrollLeft } = this.state
    if (!columns || columns.length === 0)
      return (
        <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
          {children}
        </table>
      )

    const floatClass = []
    if (this.props.fixed === 'x') {
      if (scrollLeft > 0) {
        floatClass.push('float-left')
      }
      if (scrollLeft !== 1) {
        floatClass.push('float-right')
      }
    }

    return (
      <TableContext.Provider
        value={{
          colgroup: this.state.colgroup,
          fixed: this.props.fixed,
        }}
      >
        {this.renderBody(floatClass)}
        {children}
      </TableContext.Provider>
    )
  }
}

export default SimpleTable
