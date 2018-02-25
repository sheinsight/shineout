import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tableClass } from '../styles'
import Sorter from './Sorter'

class Thead extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    onSortChange: PropTypes.func,
    sorter: PropTypes.object,
  }

  setColumns(columns, col, level) {
    if (!col.group) {
      columns.push(col)
      return 1
    }

    if (level > this.columnLevel) this.columnLevel = level
    const g = typeof col.group === 'string' ? [col.group] : col.group
    const last = columns[columns.length - 1]

    if (!g[level]) {
      columns.push(col)
      return 1
    }

    let colSpan = 0
    if (last && last.name === g[level]) {
      colSpan = this.setColumns(last.columns, col, level + 1)
      last.colSpan += colSpan
      if (col.fixed) last.fixed = col.fixed
    } else {
      const sub = []
      colSpan = this.setColumns(sub, col, level + 1)
      columns.push({
        name: g[level],
        colSpan,
        level,
        fixed: col.fixed,
        columns: sub,
      })
    }

    return colSpan
  }

  createTh(trs, col, level) {
    const fixed = col.fixed ? `fixed-${col.fixed}` : false
    const { sorter, onSortChange } = this.props

    if (col.title) {
      trs[level].push((
        <th
          className={tableClass(level > 0 && 'condensed', fixed)}
          rowSpan={(this.columnLevel - level) + 1}
          key={col.key}
        >
          {col.title}
          {
            col.sorter &&
            <Sorter {...col} current={sorter} onChange={onSortChange} />
          }
        </th>
      ))

      return
    }

    trs[level].push((
      <th
        className={tableClass('center', 'condensed', fixed)}
        colSpan={col.colSpan}
        key={col.name}
      >
        {col.name}
      </th>
    ))

    if (col.columns) {
      col.columns.forEach(c => this.createTh(trs, c, level + 1))
    }
  }

  formatColumns() {
    this.columnLevel = 0
    const columns = []
    this.props.columns.forEach((col) => {
      this.setColumns(columns, col, 0)
    })

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
        {
          trs.map((tr, i) => (
            <tr key={i}>{tr}</tr>
          ))
        }
      </thead>
    )
  }
}

export default Thead
