import React, { PureComponent, ReactElement } from 'react'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { tableClass } from './styles'
import Sorter from './Sorter'
import CheckboxAll from './CheckboxAll'
import { getParent } from '../utils/dom/element'
import { isNumber } from '../utils/is'
import { ColumnItemWithFixed, TheadColumn, TheadProps, GroupColumn } from './Props'
import { ObjectType } from '../@types/common'

const cacheGroup = new Map()
const MIN_RESIZABLE_WIDTH = 20
class Thead<DataItem, Value> extends PureComponent<TheadProps<DataItem, Value>> {
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

  rightBorderRecord: ObjectType<boolean>

  constructor(props: TheadProps<DataItem, Value>) {
    super(props)
    this.handleMouseDown = this.handleResize.bind(this, 'mousedown')
    this.handleMouseMove = this.handleResize.bind(this, 'mousemove')
    this.handleMouseUp = this.handleResize.bind(this, 'mouseup')
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
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        columns: sub,
      })
    }

    return colSpan
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
        this.resizeColgroup(deltaX)
      }
      this.lastX = x
    } else if (type === 'mouseup') {
      const { onColChange, colgroup } = this.props
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      this.resizingTable.classList.remove(tableClass('resizing'))
      this.resizingTh.classList.remove(tableClass('resizing-item'))
      this.lastX = undefined
      if (onColChange) onColChange(this.resizingIndex, parseInt(this.resizingCol.style.width, 10), colgroup)
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
    if (colTemp.title) {
      trs[level].push(
        <th
          className={classnames(
            tableClass(level > 0 && 'condensed', align, ignoreBorderRight, ...fixed),
            (col as ColumnItemWithFixed<DataItem>).className
          )}
          rowSpan={this.columnLevel - level + 1}
          key={col.key}
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
        </th>
      )

      return
    }

    if (colTemp.type === 'checkbox') {
      trs[level].push(
        <th
          key="checkbox"
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
        </th>
      )
      return
    }

    const style = typeof colTemp2.name === 'string' ? undefined : { padding: 0 }
    trs[level].push(
      <th
        className={classnames(
          tableClass('center', 'condensed', ignoreBorderRight, ...fixed),
          (col as ColumnItemWithFixed<DataItem>).className
        )}
        colSpan={colTemp2.colSpan}
        key={col.key}
        style={style}
      >
        {colTemp2.name}
        {resize}
      </th>
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
          <tr key={i}>{tr}</tr>
        ))}
      </thead>
    )
  }
}

export default Thead
