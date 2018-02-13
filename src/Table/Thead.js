import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { tableClass } from '../styles'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

function formatColumns(columns) {
  const g1 = []
  const g2 = []

  columns.forEach((col, i) => {
    if (!col.group || i === 0) {
      g1.push({ col })
      return
    }
    const last = g1[g1.length - 1]
    if (col.group === last.title) {
      last.count += 1
      if (last.col) {
        g2.push({ col: last.col })
        last.fixed = col.fixed
        last.lastFixed = col.lastFixed
        delete last.col
      }
      g2.push({ col })
    } else {
      g1.push({
        col,
        title: col.group,
        fixed: col.fixed,
        firstFixed: col.firstFixed,
        count: 1,
      })
    }
  })

  return [g1, g2]
}

function getGroupClassName(group) {
  return classnames(
    tableClass(
      'center', 'condensed',
      group.lastFixed && 'fixed-last',
      group.firstFixed && 'fixed-first',
    ),
    group.fixed === 'left' && CLASS_FIXED_LEFT,
    group.fixed === 'right' && CLASS_FIXED_RIGHT,
  )
}

class Thead extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
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

    if (col.title) {
      trs[level].push((
        <th
          className={tableClass(level > 0 && 'condensed', fixed)}
          rowSpan={(this.columnLevel - level) + 1}
          key={col.key}
        >
          {col.title}
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

  /*
  renderTh(col, index, rowSpan, condensed) {

    const className = classnames(
      tableClass(
        condensed && 'condensed',
        col.lastFixed && 'fixed-last',
        col.firstFixed && 'fixed-first',
      ),
      col.fixed === 'left' && CLASS_FIXED_LEFT,
      col.fixed === 'right' && CLASS_FIXED_RIGHT,
    )

    return (
      <th
        key={index}
        className={className}
        rowSpan={rowSpan}
      >
        {col.title}
      </th>
    )
  }

  render() {
    const groups = formatColumns(this.props.columns)
    const mult = groups[1].length > 0

    this.formatColumns()

    return (
      <thead>
        <tr key={0}>
          {
            groups[0].map((g, i) => {
              if (g.count && g.count > 1) {
                return (
                  <th
                    key={i}
                    colSpan={g.count}
                    className={getGroupClassName(g)}
                  >
                    {g.title}
                  </th>
                )
              }

              return this.renderTh(g.col, i, mult ? 2 : 1)
            })
          }
        </tr>
        {
          mult &&
          <tr key={2}>
            { groups[1].map((g, i) => this.renderTh(g.col, i, 1, true)) }
          </tr>
        }
      </thead>
    )
  }
  */
}

export default Thead
