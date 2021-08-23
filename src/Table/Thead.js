import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { tableClass } from '../styles'
import Sorter from './Sorter'
import CheckboxAll from './CheckboxAll'
import { getParent } from '../utils/dom/element'

const cacheGroup = new Map()
const MIN_RESIZABLE_WIDTH = 20
class Thead extends PureComponent {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleResize.bind(this, 'mousedown')
    this.handleMouseMove = this.handleResize.bind(this, 'mousemove')
    this.handleMouseUp = this.handleResize.bind(this, 'mouseup')
  }

  setColumns(columns, col, level, index = 0) {
    if (!col.group) {
      columns.push(col)
      return 1
    }

    if (level > this.columnLevel) this.columnLevel = level
    const g = Array.isArray(col.group) ? col.group : [col.group]
    const last = columns[columns.length - 1]

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
      const sub = []
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

  resizeColgroup(deltaX) {
    let oWidth = parseInt(this.resizingCol.style.width, 10)
    if (Number.isNaN(oWidth) || oWidth === 0) {
      oWidth = this.resizingTh.getBoundingClientRect().width
    }
    const w = `${Math.max(oWidth + deltaX, MIN_RESIZABLE_WIDTH)}px`
    this.resizingCol.style.width = w
  }

  handleResize(type, e) {
    if (type === 'mousedown') {
      const { target } = e
      this.resizingTh = getParent(target, 'th')
      this.resizingTable = getParent(target, 'table')
      this.resizingIndex = [].indexOf.call(getParent(target, 'tr').children, this.resizingTh)
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

  createTh(trs, col, level) {
    const { columnResizable } = this.props
    const fixed = []
    if (col.fixed) fixed.push(`fixed-${col.fixed}`)
    if (col.firstFixed) fixed.push('fixed-first')
    if (col.lastFixed) fixed.push('fixed-last')

    const { sorter, onSortChange, data, datum, showSelectAll, disabled, treeColumnsName, treeCheckAll } = this.props
    const align = col.align && `align-${col.align}`
    const ignoreBorderRight = this.rightBorderRecord[col.key] && 'ignore-right-border'
    const resize =
      level === 0 && columnResizable && col.columnResizable !== false ? (
        <span onMouseDown={this.handleMouseDown} className={tableClass('resize-spanner')} />
      ) : null
    if (col.title) {
      trs[level].push(
        <th
          className={classnames(
            tableClass(level > 0 && 'condensed', align, ignoreBorderRight, ...fixed),
            col.className
          )}
          rowSpan={this.columnLevel - level + 1}
          key={col.key}
        >
          <div className={tableClass(col.sorter && 'has-sorter')}>
            <span>{typeof col.title === 'function' ? col.title(data) : col.title}</span>
            {col.sorter && <Sorter {...col} current={sorter} onChange={onSortChange} />}
            {resize}
          </div>
        </th>
      )

      return
    }

    if (col.type === 'checkbox') {
      trs[level].push(
        <th key="checkbox" rowSpan={trs.length} className={classnames(tableClass('checkbox', ...fixed), col.className)}>
          {showSelectAll && (
            <CheckboxAll
              disabled={disabled === true}
              data={data}
              datum={datum}
              treeColumnsName={treeCheckAll && treeColumnsName}
            />
          )}
        </th>
      )
      return
    }

    const style = typeof col.name === 'string' ? undefined : { padding: 0 }
    trs[level].push(
      <th
        className={classnames(tableClass('center', 'condensed', ignoreBorderRight, ...fixed), col.className)}
        colSpan={col.colSpan}
        key={col.key}
        style={style}
      >
        {col.name}
        {resize}
      </th>
    )

    if (col.columns) {
      col.columns.forEach(c => this.createTh(trs, c, level + 1))
    }
  }

  ignoreRightBorder(column) {
    this.rightBorderRecord[column.key] = true
    if (column.columns) this.ignoreRightBorder(column.columns[column.columns.length - 1])
  }

  formatColumns() {
    this.columnLevel = 0
    const columns = []
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
    const trs = []
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

Thead.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSortChange: PropTypes.func,
  sorter: PropTypes.array,
  showSelectAll: PropTypes.bool,
  bordered: PropTypes.bool,
  onColChange: PropTypes.func,
  columnResizable: PropTypes.bool,
  treeColumnsName: PropTypes.string,
  treeCheckAll: PropTypes.bool,
  colgroup: PropTypes.array,
}

Thead.defaultProps = {
  showSelectAll: true,
}

export default Thead
