import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from '../utils/uid'
import { tableClass } from '../styles'
import Sorter from './Sorter'
import CheckboxAll from './CheckboxAll'

class Thead extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    onSortChange: PropTypes.func,
    sorter: PropTypes.object,
    datum: PropTypes.object,
  }

  setColumns(columns, col, level) {
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
      colSpan = this.setColumns(last.columns, col, level + 1)
      last.colSpan += colSpan
      if (col.fixed) last.fixed = col.fixed
      if (col.lastFixed) last.lastFixed = true
    } else {
      const sub = []
      colSpan = this.setColumns(sub, col, level + 1)
      columns.push({
        name: g[level],
        key: typeof g[level] === 'string' ? g[level] : getUidStr(),
        colSpan,
        level,
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        columns: sub,
      })
    }

    return colSpan
  }

  createTh(trs, col, level) {
    const fixed = []
    if (col.fixed) fixed.push(`fixed-${col.fixed}`)
    if (col.firstFixed) fixed.push('fixed-first')
    if (col.lastFixed) fixed.push('fixed-last')

    const {
      sorter, onSortChange, data, datum,
    } = this.props

    if (col.title) {
      trs[level].push((
        <th
          className={tableClass(level > 0 && 'condensed', ...fixed)}
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

    if (col.type === 'checkbox') {
      trs[level].push((
        <th key="checkbox" rowSpan={trs.length} className={tableClass('checkbox', ...fixed)}>
          <CheckboxAll data={data} datum={datum} />
        </th>
      ))

      return
    }

    const style = typeof col.name === 'string' ? undefined : { padding: 0 }
    trs[level].push((
      <th
        className={tableClass('center', 'condensed', ...fixed)}
        colSpan={col.colSpan}
        key={col.key}
        style={style}
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
