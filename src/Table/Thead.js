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
        delete last.col
      }
      g2.push({ col })
    } else {
      g1.push({
        col,
        title: col.group,
        count: 1,
      })
    }
  })

  return [g1, g2]
}

class Thead extends PureComponent {
  renderTh(col, index, rowSpan, condensed) {
    /*
    const style = {}
    if (col.fixed === 'left') {
      style.transform = `translateX(${scrollLeft}px)`
    }
    */

    const className = classnames(
      tableClass(
        condensed && 'condensed',
        col.lastFixed && 'last-fixed',
        col.firstFixed && 'first-fixed',
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
                    className={tableClass('center', 'condensed')}
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
}

Thead.propTypes = {
  columns: PropTypes.array.isRequired,
}

export default Thead
