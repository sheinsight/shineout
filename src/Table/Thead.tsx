import React, { PureComponent, ReactElement } from 'react'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { tableClass } from './styles'
import Sorter from './Sorter'
import CheckboxAll from './CheckboxAll'
import { getParent } from '../utils/dom/element'
import { isNumber } from '../utils/is'
import { ColumnItemWithFixed, TheadColumn, TheadProps, GroupColumn } from './Props'
import Th from './Th'
import { ObjectType } from '../@types/common'

const cacheGroup = new Map()
const MIN_RESIZABLE_WIDTH = 20

interface TheadState {
  trHeights: number[];
}

class Thead<DataItem, Value> extends PureComponent<TheadProps<DataItem, Value>, TheadState> {
  static defaultProps = {
    showSelectAll: true,
  }

  handleMouseDown: (e: React.MouseEvent) => void

  handleMouseMove: () => void

  handleMouseUp: () => void

  resizingTh: HTMLTableHeaderCellElement

  resizingTable: HTMLTableElement

  columnLevel: number

  resizingIndex: number

  resizingCol: HTMLTableColElement

  lastX?: number

  newResizingWidth: number

  rightBorderRecord: ObjectType<boolean>

  trs: (HTMLTableRowElement | null)[]

  constructor(props: TheadProps<DataItem, Value>) {
    super(props)
    this.state = {
      trHeights: [],
    }
    this.trs = []
    this.handleMouseDown = this.handleResize.bind(this, 'mousedown')
    this.handleMouseMove = this.handleResize.bind(this, 'mousemove')
    this.handleMouseUp = this.handleResize.bind(this, 'mouseup')
  }

  componentDidMount() {
    this.recordTrHeights()
  }

  componentDidUpdate(prevProps: TheadProps<DataItem, Value>) {
    if (prevProps.columns !== this.props.columns) {
      this.recordTrHeights()
    }
  }

  recordTrHeights() {
    const trHeights = this.trs.map(tr => tr ? tr.offsetHeight || 0 : 0)
    this.setState({ trHeights })
  }

  setColumns(columns: TheadColumn<DataItem>[], col: ColumnItemWithFixed<DataItem>, level: number, index = 0) {
    if (!col.group) {
      columns.push(col)
      return 1
    }

    if (level > this.columnLevel) this.columnLevel = level
    const g = Array.isArray(col.group) ? col.group : [col.group]
    const last = columns[columns.length - 1] as GroupColumn<DataItem>

    if (!g[level]) {
      columns.push(col)
      return 1
    }

    let colSpan = 0
    if (last && last.name === g[level]) {
      colSpan = this.setColumns(last.columns, col, level + 1, index)
      last.colSpan += colSpan
      if (col.fixed) last.fixed = col.fixed
      if (col.lastFixed) last.lastFixed = true
    } else {
      const sub = [] as TheadColumn<DataItem>[]
      colSpan = this.setColumns(sub, col, level + 1, index)
      const group = g[level]
      columns.push({
        name: g[level],
        key:
          typeof g[level] === 'string'
            ? `${index}-${g[level]}`
            : cacheGroup.get(group) || cacheGroup.set(group, getUidStr()).get(group),
        colSpan,
        level,
        index,
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        columns: sub,
      })
    }
    return colSpan
  }

  get resizingColspan() {
    return parseInt(this.resizingTh.getAttribute('colspan') || '', 10)
  }

  getNewColgroup() {
    const { colgroup } = this.props
    if (!colgroup) return []
    const colElements = this.resizingCol.parentElement?.children as HTMLCollection
    const startIndex = this.resizingIndex
    const endIndex = startIndex + (this.resizingColspan || 1) - 1
    const colElementsArray = Array.from(colElements)
    return colgroup.map((col, index) => {
      if (index >= startIndex && index <= endIndex) {
        return colElementsArray[index].getBoundingClientRect().width || col
      }
      return col
    })
  }

  resizeColgroup(deltaX: number) {
    const { columns } = this.props
    const item = columns[this.resizingIndex]
    const { minWidth, maxWidth } = item
    let oWidth = parseInt(this.resizingCol.style.width, 10)
    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = this.resizingTh.getBoundingClientRect().width
    }
    let w = oWidth + deltaX
    if (isNumber(minWidth)) {
      w = Math.max(w, minWidth)
    } else {
      w = Math.max(w, MIN_RESIZABLE_WIDTH)
    }

    if (isNumber(maxWidth)) {
      w = Math.min(w, maxWidth)
    }
    this.resizingCol.style.width = `${w}px`
    this.newResizingWidth = w
  }

  resizeMultipleColgroup(deltaX: number, colspan: number) {
    const { columns } = this.props
    const siblings = this.resizingCol.parentElement?.children as HTMLCollection
    const startIndex = this.resizingIndex
    const endIndex = startIndex + colspan - 1
    const resizingCols = Array.from(siblings).filter((_, index) => index >= startIndex && index <= endIndex)
    const resizingItems = columns.filter((_, index) => index >= startIndex && index <= endIndex)
    const minWidthTotal = resizingItems.reduce((total, item) => (item.minWidth ? total + (item.minWidth || 0) : 0), 0)
    const maxWidthTotal = resizingItems.reduce((total, item) => (item.maxWidth ? total + (item.maxWidth || 0) : 0), 0)

    let oWidth = resizingCols.reduce((total, col: HTMLTableColElement) => total + parseInt(col.style.width, 10), 0)
    const colWidthRate = resizingCols.map((col: HTMLTableColElement) => col.getBoundingClientRect().width / oWidth)

    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = resizingCols.reduce((total, col: HTMLTableColElement) => total + col.getBoundingClientRect().width, 0)
    }
    let w = oWidth + deltaX
    if (isNumber(minWidthTotal) && minWidthTotal > 0) {
      w = Math.max(w, minWidthTotal)
    } else {
      w = Math.max(w, MIN_RESIZABLE_WIDTH)
    }

    if (isNumber(maxWidthTotal) && maxWidthTotal > 0) {
      w = Math.min(w, maxWidthTotal)
    }
    // 将w按照它们原本的比例分配
    resizingCols.forEach((col: HTMLTableColElement, index: number) => {
      col.style.width = `${w * colWidthRate[index]}px`
    })
    this.newResizingWidth = w
  }

  handleResize(type: 'mousedown' | 'mousemove' | 'mouseup', e: MouseEvent) {
    if (type === 'mousedown') {
      const target = e.target as HTMLElement
      this.resizingTh = getParent(target, 'th') as HTMLTableHeaderCellElement
      this.resizingTable = getParent(target, 'table') as HTMLTableElement
      const thList = getParent(target, 'tr')!.children

      const indexInTr = [].indexOf.call(thList, this.resizingTh)
      this.resizingIndex = [].slice
        .call(thList, 0, indexInTr)
        .reduce((total: number, th: HTMLTableHeaderCellElement) => {
          const count = Number(th.getAttribute('colspan')) || 1
          return total + count
        }, 0)
      this.resizingCol = this.resizingTable.querySelectorAll('col')[this.resizingIndex]
      this.resizingTable.classList.add(tableClass('resizing'))
      this.resizingTh.classList.add(tableClass('resizing-item'))
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    } else if (type === 'mousemove') {
      const x = e.clientX
      if (typeof this.lastX === 'number') {
        const deltaX = x - this.lastX
        if (this.resizingColspan > 1) {
          this.resizeMultipleColgroup(deltaX, this.resizingColspan)
        } else {
          this.resizeColgroup(deltaX)
        }
      }
      this.lastX = x
    } else if (type === 'mouseup') {
      const { onColChange } = this.props
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      this.resizingTable.classList.remove(tableClass('resizing'))
      this.resizingTh.classList.remove(tableClass('resizing-item'))
      this.lastX = undefined
      const newColgroup = this.getNewColgroup()
      if (onColChange) onColChange(this.resizingIndex, this.newResizingWidth, newColgroup, this.resizingColspan)
    }
  }

  createTh(trs: ReactElement[][], col: TheadColumn<DataItem>, level: number) {
    const { columnResizable } = this.props
    const colTemp = col as ColumnItemWithFixed<DataItem>
    const colTemp2 = col as GroupColumn<DataItem>
    const fixed = []
    if (col.fixed) fixed.push(`fixed-${col.fixed}`)
    if (col.firstFixed) fixed.push('fixed-first')
    if (col.lastFixed) fixed.push('fixed-last')

    const { sorter, onSortChange, data, datum, showSelectAll, disabled, treeColumnsName, treeCheckAll } = this.props
    const isEmpty = !(data && data.length)
    const align = colTemp.align && `align-${colTemp.align}`
    const ignoreBorderRight = this.rightBorderRecord[col.key] && 'ignore-right-border'
    const resize =
      level === 0 && !isEmpty && columnResizable && (col as ColumnItemWithFixed<DataItem>).columnResizable !== false ? (
        <span onMouseDown={this.handleMouseDown} className={tableClass('resize-spanner')} />
      ) : null
    const stickyTop = level > 0 ? this.state.trHeights.slice(0, level).reduce((sum, height) => sum + height, 0) : 0
    if (colTemp.title) {
      trs[level].push(
        <Th
          className={classnames(
            tableClass(level > 0 && 'condensed', align, ignoreBorderRight, ...fixed),
            (col as ColumnItemWithFixed<DataItem>).className
          )}
          rowSpan={this.columnLevel - level + 1}
          top={stickyTop}
          key={col.key}
          fixed={col.fixed}
          index={col.index}
          sticky={this.props.sticky}
        >
          <div className={tableClass(colTemp.sorter && 'has-sorter')}>
            <span>{typeof colTemp.title === 'function' ? colTemp.title(data) : colTemp.title}</span>
            {colTemp.sorter && (
              <Sorter
                {...colTemp}
                sorter={colTemp.sorter}
                current={sorter}
                keyStr={col.key}
                onChange={onSortChange}
                renderSorter={this.props.renderSorter}
              />
            )}
            {resize}
          </div>
        </Th>
      )

      return
    }

    if (colTemp.type === 'checkbox') {
      trs[level].push(
        <Th
          key="checkbox"
          top={stickyTop}
          fixed={col.fixed}
          index={col.index}
          sticky={this.props.sticky}
          rowSpan={trs.length}
          className={classnames(tableClass('checkbox', ...fixed), colTemp.className)}
        >
          {showSelectAll && (
            <CheckboxAll
              disabled={disabled === true}
              data={data}
              datum={datum}
              treeColumnsName={treeCheckAll ? treeColumnsName : undefined}
              col={col}
            />
          )}
        </Th>
      )
      return
    }

    const style = typeof colTemp2.name === 'string' ? undefined : { padding: 0 }
    trs[level].push(
      <Th
        className={classnames(
          tableClass('center', 'condensed', ignoreBorderRight, ...fixed),
          (col as ColumnItemWithFixed<DataItem>).className
        )}
        colSpan={colTemp2.colSpan}
        key={col.key}
        style={style}
        fixed={col.fixed}
        index={col.index}
        sticky={this.props.sticky}
        top={stickyTop}
      >
        {colTemp2.name}
        {resize}
      </Th>
    )

    if (colTemp2.columns) {
      colTemp2.columns.forEach(c => this.createTh(trs, c, level + 1))
    }
  }

  ignoreRightBorder(column: TheadColumn<DataItem>) {
    const columnGroup = column as GroupColumn<DataItem>
    this.rightBorderRecord[column.key] = true
    if (columnGroup.columns) this.ignoreRightBorder(columnGroup.columns[columnGroup.columns.length - 1])
  }

  formatColumns() {
    this.columnLevel = 0
    const columns: TheadColumn<DataItem>[] = []
    this.props.columns.forEach((col, index) => {
      this.setColumns(columns, col, 0, index)
    })

    this.rightBorderRecord = {}
    if (columns.length > 0 && this.props.bordered) {
      this.ignoreRightBorder(columns[columns.length - 1])
    }
    return columns
  }

  formatTrs() {
    const columns = this.formatColumns()
    const trs: ReactElement[][] = []
    for (let i = 0; i <= this.columnLevel; i++) {
      trs.push([])
    }
    columns.forEach(col => this.createTh(trs, col, 0))
    return trs
  }

  render() {
    const trs = this.formatTrs()

    return (
      <thead>
        {trs.map((tr, i) => (
          <tr
            key={i}
            ref={el => {
              this.trs[i] = el
            }}
          >
            {tr}
          </tr>
        ))}
      </thead>
    )
  }
}

export default Thead
